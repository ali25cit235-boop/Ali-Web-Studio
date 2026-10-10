import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Modality, Type } from '@google/genai';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const app = express();
const server = http.createServer(app);

// JSON body parser with generous limit for audio payloads
app.use(express.json({ limit: '15mb' }));

// Initialize Google Gen AI client with mandatory telemetry header
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const RECEPTIONIST_SYSTEM_INSTRUCTION = `You are the friendly, professional AI receptionist and sales assistant for Ali AI Solutions.

Your purpose is to demonstrate AI voice agents and help potential clients understand our services.

Speak naturally, clearly, and warmly. Be concise and conversational. Avoid robotic or excessively long answers.

Use English by default. Detect the visitor's language and respond in that language whenever supported. If they switch languages, adapt naturally. Support English, Urdu, Hindi, Arabic, Spanish, French, and any other supported language.

Ask only one question at a time. Listen carefully and do not interrupt unnecessarily.

Our services are:
1. AI Voice Agents for handling incoming calls, answering common questions, qualifying leads, and routing enquiries.
2. Website Development for professional, responsive business websites.
3. Business Automation for reducing repetitive administrative tasks.
4. Custom AI Assistants for suitable business workflows.

Start with a brief greeting and ask what kind of business the visitor runs or what they would like to automate.

Help the visitor understand the relevant service. Ask about their business type, the problem they want to solve, their preferred features, and any important requirements.

Do not make up prices, delivery timelines, customer results, testimonials, technical capabilities, or integrations. If you do not know something, say the team can confirm it.

Do not claim that you have booked a meeting, sent an email, sent a WhatsApp message, or notified a human unless a real backend action confirms success.

Clearly identify yourself as an AI assistant when asked. Do not pretend to be a human employee.

If the visitor wants to speak to the agency team, offer to collect their contact details with their permission.

Never ask for passwords, payment-card information, identity documents, or unnecessary sensitive information.

Do not pressure visitors to buy. Help them understand their options.`;

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
      console.warn(`[Gemini] Model ${model} returned error, trying fallback:`, err?.message || err);
      lastError = err;
    }
  }

  throw lastError || new Error('All conversational models currently unavailable. Please try again in a moment.');
}

// Resilient TTS speech synthesis helper
async function synthesizeSpeech(text: string, voiceName = 'Kore'): Promise<string> {
  const modelsToTry = ['gemini-3.8-flash-lite-tts', 'gemini-3.8-flash-tts'];
  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: [
          {
            role: 'user',
            parts: [
              {
                text,
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

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        return base64Audio;
      }
    } catch (err: any) {
      console.warn(`[TTS] Model ${model} failed, trying next:`, err?.message || err);
      lastError = err;
    }
  }

  throw lastError || new Error('TTS voice synthesis unavailable');
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!apiKey,
    agency: 'Ali AI Solutions',
    voice: 'Kore (Female, Warm Customer Service)',
    primaryChatModel: 'gemini-flash-latest',
    fallbackChatModel: 'gemini-3.1-flash-lite',
    liveModel: 'gemini-3.8-live',
    ttsModel: 'gemini-3.8-flash-lite-tts',
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

// High-Fidelity Text-to-Speech endpoint using gemini-3.8-flash-lite-tts with female voice 'Kore'
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
    res.json({ audioBase64: base64Audio, mimeType: 'audio/wav' });
  } catch (err: unknown) {
    console.error('TTS API Error:', err);
    const message = err instanceof Error ? err.message : 'Speech synthesis failed';
    res.status(500).json({ error: message });
  }
});

// Full Voice Turn endpoint (Processes conversational turn and synthesizes speech in 1 fast roundtrip)
app.post('/api/voice-turn', async (req, res) => {
  try {
    const { messages, userText, languagePreference, voiceName = 'Kore' } = req.body;

    if (!apiKey) {
      res.status(503).json({ error: 'Gemini API key missing' });
      return;
    }

    let history: Array<{ role: string; content?: string; text?: string }> = [];
    if (Array.isArray(messages)) {
      history = [...messages];
    }
    if (userText && typeof userText === 'string') {
      history.push({ role: 'user', content: userText.trim() });
    }

    if (history.length === 0) {
      res.status(400).json({ error: 'No user input or message history provided' });
      return;
    }

    let langInstruction = '';
    if (languagePreference && languagePreference !== 'auto') {
      langInstruction = ` Preferred language requested: ${languagePreference}. Please speak in ${languagePreference}.`;
    }

    const sanitizedContents = formatAndSanitizeContents(history);
    const reply = await generateReceptionistReply(
      sanitizedContents,
      RECEPTIONIST_SYSTEM_INSTRUCTION + langInstruction
    );

    // Synthesize audio
    let audioBase64: string | null = null;
    try {
      audioBase64 = await synthesizeSpeech(reply, voiceName);
    } catch (ttsErr) {
      console.warn('Voice turn TTS synthesis error:', ttsErr);
    }

    res.json({
      reply,
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
  console.log('[WebSocket] Client connected to Live Voice stream');

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

  // Session duration timeout (5 minutes max per session to protect free tier quota)
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
    // Attempt Live API connection using gemini-3.8-live and female voice 'Kore'
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
        systemInstruction: RECEPTIONIST_SYSTEM_INSTRUCTION,
      },
      callbacks: {
        onmessage: (message: any) => {
          if (clientWs.readyState !== WebSocket.OPEN) return;

          // Check for audio output chunk
          const audioChunk = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          const textChunk = message.serverContent?.modelTurn?.parts?.[0]?.text;

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

          // Interruption event from model
          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ type: 'interrupted' }));
          }

          // Turn complete
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
          console.error('[Live API] Error:', err);
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
    console.warn('[Live API] Direct Live connection fallback:', err);
    // If Live API is encountering quota or network restriction,
    // notify client to use the turn-by-turn conversational audio fallback
    clientWs.send(
      JSON.stringify({
        type: 'status',
        status: 'connected',
        mode: 'turn_fallback',
        message: 'Voice engine ready in conversational turn mode.',
      })
    );
  }

  // Handle incoming audio and text messages from browser
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
      } else if (msg.type === 'end') {
        if (session) {
          try {
            session.close();
          } catch {
            // ignore
          }
        }
        clientWs.close();
      }
    } catch (parseErr) {
      console.warn('Error processing client message:', parseErr);
    }
  });

  clientWs.on('close', () => {
    clearTimeout(sessionTimeout);
    if (session) {
      try {
        session.close();
      } catch {
        // ignore
      }
    }
    console.log('[WebSocket] Client disconnected');
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
