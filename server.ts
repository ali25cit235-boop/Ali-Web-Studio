import express from 'express';
import http from 'http';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Modality, Type } from '@google/genai';
import { WebSocketServer, WebSocket } from 'ws';

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = parseInt(process.env.PORT || '3000', 10);

// JSON body parser with generous limit for audio payloads
app.use(express.json({ limit: '20mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';
if (!apiKey) {
  console.warn('[Warning] GEMINI_API_KEY is not set in environment. Voice and Chat features will report key missing.');
}

const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'AliAISolutions-VoiceReceptionist/1.0',
    },
  },
});

// Receptionist System Instruction
const RECEPTIONIST_SYSTEM_INSTRUCTION = `You are the polite, welcoming, and knowledgeable AI voice and chat receptionist for Ali AI Solutions (aliaisolutions.com), an AI automation and web studio agency founded by Ali Raza in Pakistan, serving global clients.

Your job is to greet callers or visitors warmly, answer questions about agency services, qualify prospective clients, and offer a consultation or contact follow-up.

Key Agency Services:
1. AI Voice Agents & Receptionists for automated appointment scheduling, customer inquiries, and lead qualification.
2. Website Development for modern, high-performance, responsive business websites and web applications.
3. Business Automation for streamlining repetitive administrative workflows, CRM sync, and reminders.
4. Custom AI Assistants & Chatbots tailored to industry-specific operations.

Tone and Demeanor:
- Friendly, warm, confident, professional, and concise.
- Keep spoken responses short and natural (1 to 2 sentences per turn), ideal for real-time voice conversations.
- Do not make up prices or guaranteed deadlines. State that custom quotes and timelines depend on project scope.
- Clearly identify as an AI assistant when asked.
- Offer to collect contact details (name, email or WhatsApp number) for follow-up if the visitor expresses genuine interest.`;

// Format and sanitize chat history so Gemini never rejects turn sequence or first role
function formatAndSanitizeContents(messages: Array<{ role: string; content?: string; text?: string }>) {
  const rawList = messages
    .filter((m) => (m.content || m.text || '').trim().length > 0)
    .map((m) => ({
      role: m.role === 'user' ? ('user' as const) : ('model' as const),
      text: (m.content || m.text || '').trim(),
    }));

  if (rawList.length === 0) {
    return [{ role: 'user' as const, parts: [{ text: 'Hello' }] }];
  }

  // Ensure first turn sent to Gemini is 'user'
  let list = rawList;
  while (list.length > 0 && list[0].role !== 'user') {
    list.shift();
  }
  if (list.length === 0) {
    list = [{ role: 'user' as const, text: rawList[0].text || 'Hello' }];
  }

  // Merge adjacent turns with the same role so they alternate strictly user -> model -> user
  const collapsed: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }> = [];
  for (const item of list) {
    if (collapsed.length > 0 && collapsed[collapsed.length - 1].role === item.role) {
      collapsed[collapsed.length - 1].parts[0].text += `\n${item.text}`;
    } else {
      collapsed.push({ role: item.role, parts: [{ text: item.text }] });
    }
  }

  return collapsed;
}

// Resilient multi-model generation with automatic fallback to prevent 503 high-demand spike failures
async function generateReceptionistReply(contents: any[], systemInstruction: string): Promise<string> {
  const modelsToTry = ['gemini-flash-latest', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];
  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });
      const text = response.text?.trim();
      if (text) {
        return text;
      }
    } catch (err: any) {
      console.warn(`[Gemini] Model ${model} returned notice, trying fallback:`, err?.message || err);
      lastError = err;
    }
  }

  throw lastError || new Error('All conversational models currently unavailable. Please try again in a moment.');
}

// Resilient TTS speech synthesis helper
async function synthesizeSpeech(text: string, voiceName = 'Kore'): Promise<string | null> {
  const modelsToTry = ['gemini-3.8-flash-tts', 'gemini-3.8-flash-lite-tts'];

  for (const model of modelsToTry) {
    try {
      const ttsPromise = ai.models.generateContent({
        model,
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: text.slice(0, 400),
                speechMetadata: {
                  style: 'Friendly, natural, professional female receptionist',
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voiceName || 'Kore' },
            },
          },
        },
      });

      // 4.5s timeout per model attempt so turns stay fast and conversational
      const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 4500));
      const response = await Promise.race([ttsPromise, timeoutPromise]);
      if (!response) {
        continue;
      }

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        return base64Audio;
      }
    } catch (err: any) {
      console.warn(`[TTS] Model ${model} notice:`, err?.message || err);
    }
  }

  // Fallback to Live Session rapid streaming if dedicated TTS models are on quota limit
  try {
    return await new Promise<string | null>((resolve) => {
      let resolved = false;
      const chunks: string[] = [];
      ai.live.connect({
        model: 'gemini-3.8-live',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceName || 'Kore' } },
          },
        },
        callbacks: {
          onmessage: (msg: any) => {
            const chunk = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (chunk) chunks.push(chunk);
            if (msg.serverContent?.turnComplete) {
              if (!resolved) {
                resolved = true;
                resolve(chunks.length > 0 ? chunks[0] : null);
              }
            }
          },
          onerror: () => {
            if (!resolved) {
              resolved = true;
              resolve(null);
            }
          },
          onclose: () => {
            if (!resolved) {
              resolved = true;
              resolve(chunks.length > 0 ? chunks[0] : null);
            }
          },
        },
      }).then((sess) => {
        sess.sendClientContent({
          turns: [{ role: 'user', parts: [{ text: `Say warmly as receptionist: ${text.slice(0, 250)}` }] }],
          turnComplete: true,
        });
        setTimeout(() => {
          if (!resolved) {
            resolved = true;
            try { sess.close(); } catch {}
            resolve(chunks.length > 0 ? chunks[0] : null);
          }
        }, 3500);
      }).catch(() => resolve(null));
    });
  } catch {}

  return null; // Signals client to use zero-latency browser speech synthesis fallback
}

// Active session tracking
let activeWsConnections = 0;

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!apiKey,
    agency: 'Ali AI Solutions',
    voice: 'Kore (Female, Warm Customer Service)',
    primaryChatModel: 'gemini-flash-latest',
    fallbackChatModel: 'gemini-3.1-flash-lite',
    ttsModel: 'gemini-3.8-flash-tts',
    liveModel: 'gemini-3.8-live',
    activeSessions: activeWsConnections,
  });
});

// Text Chat endpoint with multi-model resilience and history sanitization
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, languagePreference } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Messages array is required' });
      return;
    }

    if (!apiKey) {
      res.status(503).json({
        error: 'Gemini API key is not configured in environment. Please configure GEMINI_API_KEY in the Secrets panel.',
      });
      return;
    }

    let langInstruction = '';
    if (languagePreference && languagePreference !== 'auto') {
      langInstruction = ` Preferred language explicitly requested by user: ${languagePreference}. Please respond in ${languagePreference}.`;
    }

    const sanitizedContents = formatAndSanitizeContents(messages);
    const reply = await generateReceptionistReply(
      sanitizedContents,
      RECEPTIONIST_SYSTEM_INSTRUCTION + langInstruction
    );

    res.json({ reply });
  } catch (err: unknown) {
    console.error('Chat API Error:', err);
    const message = err instanceof Error ? err.message : 'Failed to generate response';
    res.status(500).json({ error: message });
  }
});

// High-Fidelity Text-to-Speech endpoint
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceName = 'Kore' } = req.body;

    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text is required for TTS' });
      return;
    }

    if (!apiKey) {
      res.status(503).json({ error: 'Gemini API key missing' });
      return;
    }

    const base64Audio = await synthesizeSpeech(text, voiceName);
    res.json({ audioBase64: base64Audio, mimeType: base64Audio ? 'audio/wav' : null });
  } catch (err: unknown) {
    console.error('TTS API Error:', err);
    const message = err instanceof Error ? err.message : 'Speech synthesis failed';
    res.status(500).json({ error: message });
  }
});

// Full Voice Turn endpoint (Supports direct recorded userAudio OR userText with seamless fallback)
app.post('/api/voice-turn', async (req, res) => {
  try {
    const { messages, userText, userAudio, audioMimeType = 'audio/wav', languagePreference, voiceName = 'Kore' } = req.body;

    if (!apiKey) {
      res.status(503).json({ error: 'Gemini API key missing' });
      return;
    }

    let history: Array<{ role: string; content?: string; text?: string }> = [];
    if (Array.isArray(messages)) {
      history = [...messages];
    }

    let userTranscript = userText ? userText.trim() : '';
    let reply = '';

    let langInstruction = '';
    if (languagePreference && languagePreference !== 'auto') {
      langInstruction = ` Preferred language: ${languagePreference}.`;
    }

    // Case 1: Caller provided audio data directly
    if (userAudio && typeof userAudio === 'string' && userAudio.length > 50) {
      try {
        const sanitizedHistory = formatAndSanitizeContents(history);
        const turnPrompt = `You are the polite, helpful AI receptionist for Ali AI Solutions.
Listen carefully to the caller's spoken audio.
First, transcribe what the caller said.
Then, give your concise, professional receptionist response (1 to 2 spoken sentences).${langInstruction}
Respond strictly in this format:
TRANSCRIPT: <caller speech transcription>
REPLY: <your receptionist spoken response>`;

        const response = await ai.models.generateContent({
          model: 'gemini-flash-latest',
          contents: [
            ...sanitizedHistory,
            {
              role: 'user',
              parts: [
                {
                  inlineData: {
                    mimeType: audioMimeType || 'audio/wav',
                    data: userAudio,
                  },
                },
                { text: turnPrompt },
              ],
            },
          ],
          config: {
            temperature: 0.7,
          },
        });

        const rawResult = response.text?.trim() || '';
        const transcriptMatch = rawResult.match(/TRANSCRIPT:\s*(.+?)(?=\nREPLY:|$)/is);
        const replyMatch = rawResult.match(/REPLY:\s*(.+)$/is);

        if (replyMatch && replyMatch[1]) {
          reply = replyMatch[1].trim();
          userTranscript = transcriptMatch && transcriptMatch[1] ? transcriptMatch[1].trim() : 'Spoken inquiry';
        } else if (rawResult) {
          reply = rawResult.replace(/^TRANSCRIPT:.+?\n/i, '').replace(/^REPLY:/i, '').trim();
          userTranscript = transcriptMatch && transcriptMatch[1] ? transcriptMatch[1].trim() : 'Spoken inquiry';
        }
      } catch (audioTurnErr) {
        console.warn('[Voice Turn] Direct audio understanding notice, falling back to text generation:', audioTurnErr);
      }
    }

    // Case 2: If reply not set yet (or userText was supplied)
    if (!reply) {
      if (userText && typeof userText === 'string') {
        history.push({ role: 'user', content: userText.trim() });
      } else if (!userAudio) {
        res.status(400).json({ error: 'No user speech audio or text provided' });
        return;
      }

      const sanitizedContents = formatAndSanitizeContents(history);
      reply = await generateReceptionistReply(
        sanitizedContents,
        RECEPTIONIST_SYSTEM_INSTRUCTION + langInstruction
      );
      if (!userTranscript) {
        userTranscript = userText || 'Spoken inquiry';
      }
    }

    // Synthesize audio with gemini-3.8-flash-tts
    let audioBase64: string | null = null;
    try {
      audioBase64 = await synthesizeSpeech(reply, voiceName);
    } catch (ttsErr) {
      console.warn('Voice turn TTS synthesis notice:', ttsErr);
    }

    res.json({
      reply,
      userTranscript,
      audioBase64,
      mimeType: audioBase64 ? 'audio/wav' : null,
    });
  } catch (err: unknown) {
    console.error('Voice Turn API Error:', err);
    const message = err instanceof Error ? err.message : 'Voice processing failed';
    res.status(500).json({ error: message });
  }
});

// Extract Structured Lead Qualifications from Transcript
app.post('/api/extract-lead', async (req, res) => {
  try {
    const { transcript } = req.body;
    if (!transcript || typeof transcript !== 'string') {
      res.status(400).json({ error: 'Transcript is required' });
      return;
    }

    if (!apiKey) {
      res.status(503).json({ error: 'API Key missing' });
      return;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: `Analyze this conversation transcript between a visitor and the Ali AI Solutions receptionist. Extract any lead qualification information provided by the visitor. If a field was not mentioned, set it to null or leave empty.
Transcript:
${transcript}`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hasContactDetails: { type: Type.BOOLEAN, description: 'True if user gave contact details or agreed to follow-up' },
            name: { type: Type.STRING, description: 'Visitor name if provided' },
            businessName: { type: Type.STRING, description: 'Visitor company/business name' },
            businessType: { type: Type.STRING, description: 'Industry or business category' },
            interestedService: { type: Type.STRING, description: 'Service they showed interest in' },
            requirements: { type: Type.STRING, description: 'Short summary of requirements' },
            contactMethod: { type: Type.STRING, description: 'Email, phone, or WhatsApp number provided' },
            preferredTime: { type: Type.STRING, description: 'Preferred time to be contacted if any' },
          },
          required: ['hasContactDetails'],
        },
      },
    });

    let leadData = null;
    try {
      leadData = JSON.parse(response.text || '{}');
    } catch {
      leadData = {};
    }

    res.json({ lead: leadData });
  } catch (err: unknown) {
    console.error('Lead extraction error:', err);
    res.status(500).json({ error: 'Failed to extract lead info' });
  }
});

// WebSocket Server for Live Real-Time Bidirectional Voice Streaming
const wss = new WebSocketServer({ server, path: '/api/live-voice' });

wss.on('connection', async (clientWs: WebSocket) => {
  activeWsConnections++;
  console.log(`[WebSocket] Client connected (Active sessions: ${activeWsConnections})`);

  if (!apiKey) {
    clientWs.send(
      JSON.stringify({
        type: 'error',
        message: 'GEMINI_API_KEY is not configured on the server. Please add your key in Secrets.',
      })
    );
    clientWs.close();
    return;
  }

  let session: any = null;
  let isSessionActive = false;

  // Session duration timeout (5 minutes max per session to protect quota)
  const sessionTimeout = setTimeout(() => {
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(
        JSON.stringify({
          type: 'sessionLimit',
          message: 'Demo session duration limit reached (5 min). Click Start Again to continue.',
        })
      );
      clientWs.close();
    }
  }, 5 * 60 * 1000);

  try {
    clientWs.send(JSON.stringify({ type: 'status', status: 'connecting' }));

    session = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
        inputAudioTranscription: {},
        outputAudioTranscription: {},
        systemInstruction: RECEPTIONIST_SYSTEM_INSTRUCTION,
      },
      callbacks: {
        onmessage: (message: any) => {
          if (clientWs.readyState !== WebSocket.OPEN) return;

          const audioChunk = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          const textChunk =
            message.serverContent?.outputTranscription?.text ||
            message.serverContent?.modelTurn?.parts?.[0]?.text;

          // If Gemini recognized user spoken audio
          const inputTranscript = message.serverContent?.inputAudioTranscription?.text;
          if (inputTranscript) {
            clientWs.send(
              JSON.stringify({
                type: 'userSpeechTranscript',
                text: inputTranscript,
              })
            );
          }

          if (audioChunk) {
            clientWs.send(
              JSON.stringify({
                type: 'audio',
                audio: audioChunk,
                text: textChunk || '',
              })
            );
          } else if (textChunk) {
            clientWs.send(
              JSON.stringify({
                type: 'textChunk',
                text: textChunk,
              })
            );
          }

          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ type: 'interrupted' }));
          }

          if (message.serverContent?.turnComplete) {
            clientWs.send(JSON.stringify({ type: 'turnComplete' }));
          }
        },
        onclose: () => {
          console.log('[Live API] Session closed by Gemini');
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ type: 'disconnected' }));
          }
          isSessionActive = false;
        },
        onerror: (err: any) => {
          console.warn('[Live API] Error notice:', err?.message || err);
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(
              JSON.stringify({
                type: 'error',
                message: err?.message || 'Live voice stream error',
              })
            );
          }
          isSessionActive = false;
        },
      },
    });

    isSessionActive = true;
    clientWs.send(JSON.stringify({ type: 'status', status: 'connected', mode: 'live_stream' }));
  } catch (err: unknown) {
    console.warn('[Live API] Live connection fallback to conversational turns:', err);
    clientWs.send(
      JSON.stringify({
        type: 'status',
        status: 'connected',
        mode: 'turn_fallback',
        message: 'Voice engine ready in conversational turn mode.',
      })
    );
  }

  // Handle incoming messages from browser
  clientWs.on('message', async (data: any) => {
    try {
      const msg = JSON.parse(data.toString());

      if (msg.type === 'audio' && msg.audio) {
        if (session && isSessionActive) {
          session.sendRealtimeInput({
            audio: {
              data: msg.audio,
              mimeType: 'audio/pcm;rate=16000',
            },
          });
        }
      } else if (msg.type === 'activityEnd') {
        if (session && isSessionActive) {
          session.sendRealtimeInput({
            activityEnd: {},
          });
        }
      } else if (msg.type === 'speechTurn' && msg.text) {
        // Direct spoken utterance streamed to Live session for sub-second responses
        if (session && isSessionActive) {
          session.sendClientContent({
            turns: [
              {
                role: 'user',
                parts: [{ text: msg.text }],
              },
            ],
            turnComplete: true,
          });
        }
      } else if (msg.type === 'text' && msg.text) {
        if (session && isSessionActive) {
          session.sendClientContent({
            turns: [
              {
                role: 'user',
                parts: [{ text: msg.text }],
              },
            ],
            turnComplete: true,
          });
        }
      } else if (msg.type === 'interrupted') {
        // Caller barged in - stop any generation if needed
      } else if (msg.type === 'end') {
        if (session) {
          try {
            session.close();
          } catch {}
        }
        clientWs.close();
      }
    } catch (parseErr) {
      console.warn('Error processing client message:', parseErr);
    }
  });

  clientWs.on('close', () => {
    activeWsConnections = Math.max(0, activeWsConnections - 1);
    clearTimeout(sessionTimeout);
    if (session) {
      try {
        session.close();
      } catch {}
    }
    console.log(`[WebSocket] Client disconnected (Remaining: ${activeWsConnections})`);
  });
});

// Setup Vite middlewares in development or static serve in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`[Ali AI Solutions] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
