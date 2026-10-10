import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  PhoneOff, 
  RotateCcw, 
  MessageSquare, 
  Volume2, 
  VolumeX, 
  Globe, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Send, 
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  Phone,
  Settings,
  ShieldCheck,
  Lock,
  HelpCircle,
  X,
  Volume1
} from 'lucide-react';
import { 
  floatTo16BitPCM, 
  arrayBufferToBase64, 
  AudioQueuePlayer 
} from '../utils/audioUtils';
import { siteConfig } from '../data/siteConfig';

export type ConnectionState = 
  | 'idle' 
  | 'connecting' 
  | 'listening' 
  | 'thinking' 
  | 'speaking' 
  | 'disconnected' 
  | 'error';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  audioUrl?: string;
}

interface ExtractedLead {
  hasContactDetails?: boolean;
  name?: string;
  businessName?: string;
  businessType?: string;
  interestedService?: string;
  requirements?: string;
  contactMethod?: string;
  preferredTime?: string;
}

export default function VoiceAgentConsole() {
  // Mode: Voice vs Text Chat
  const [activeTab, setActiveTab] = useState<'voice' | 'chat'>('voice');

  // Connection and voice session states
  const [connectionState, setConnectionState] = useState<ConnectionState>('idle');
  const [micPermission, setMicPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [isMuted, setIsMuted] = useState(false);
  const [language, setLanguage] = useState<string>('auto');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Transcript and Lead extraction
  const [messages, setMessages] = useState<Message[]>([]);
  const [extractedLead, setExtractedLead] = useState<ExtractedLead | null>(null);
  const [showLeadReview, setShowLeadReview] = useState(false);
  const [copiedLead, setCopiedLead] = useState(false);

  // Microphone permission settings modal & test state
  const [showMicSettingsModal, setShowMicSettingsModal] = useState(false);
  const [isTestingMic, setIsTestingMic] = useState(false);
  const [micTestLevel, setMicTestLevel] = useState(0);
  const [micDeviceLabel, setMicDeviceLabel] = useState<string>('');

  // Check initial browser permission status if supported
  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'microphone' as PermissionName })
        .then((permissionStatus) => {
          setMicPermission(permissionStatus.state as 'prompt' | 'granted' | 'denied');
          permissionStatus.onchange = () => {
            setMicPermission(permissionStatus.state as 'prompt' | 'granted' | 'denied');
          };
        })
        .catch(() => {
          // Permissions API might not support microphone in all browsers
        });
    }
  }, []);

  // Dedicated explicit microphone permission request & test handler
  const requestMicPermission = async () => {
    setIsTestingMic(true);
    setErrorMessage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      setMicPermission('granted');
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        setMicDeviceLabel(audioTrack.label || 'Default Microphone');
      }

      // Quick audio level visual test
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const testCtx = new AudioCtx();
        const testSource = testCtx.createMediaStreamSource(stream);
        const analyser = testCtx.createAnalyser();
        analyser.fftSize = 64;
        testSource.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        let sampleCount = 0;
        const interval = setInterval(() => {
          analyser.getByteFrequencyData(dataArray);
          const avg = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
          setMicTestLevel(Math.min(100, Math.round((avg / 128) * 100)));
          sampleCount++;
          if (sampleCount > 25) {
            clearInterval(interval);
            setMicTestLevel(0);
            testCtx.close();
          }
        }, 80);
      } catch {
        // level meter optional
      }

      // If user isn't in an active conversation, close test stream after 3 seconds
      if (connectionState === 'idle' || connectionState === 'disconnected') {
        setTimeout(() => {
          stream.getTracks().forEach((track) => track.stop());
          setIsTestingMic(false);
        }, 2500);
      } else {
        setIsTestingMic(false);
      }
    } catch (err: any) {
      console.warn('Microphone permission request failed:', err);
      setIsTestingMic(false);
      setMicPermission('denied');
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMessage('Browser denied microphone permission. Click "Mic Settings" to see how to enable it in your browser.');
      } else {
        setErrorMessage(err.message || 'Could not access audio device. Please ensure a microphone is connected.');
      }
    }
  };

  // Text chat input state
  const [chatInput, setChatInput] = useState('');
  const [isTextLoading, setIsTextLoading] = useState(false);

  // Audio refs
  const wsRef = useRef<WebSocket | null>(null);
  const audioPlayerRef = useRef<AudioQueuePlayer | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const speechRecognitionRef = useRef<any | null>(null);

  // Session duration timer
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize audio player
  useEffect(() => {
    audioPlayerRef.current = new AudioQueuePlayer(24000);
    audioPlayerRef.current.onPlayStateChange = (isPlaying) => {
      if (isPlaying) {
        setConnectionState('speaking');
      } else {
        setConnectionState((prev) => (prev === 'speaking' ? 'listening' : prev));
      }
    };

    return () => {
      cleanupSession();
      if (audioPlayerRef.current) {
        audioPlayerRef.current.close();
      }
    };
  }, []);

  // Scroll transcript to bottom on new messages
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Session timer
  useEffect(() => {
    if (['listening', 'speaking', 'thinking'].includes(connectionState)) {
      if (!sessionTimerRef.current) {
        sessionTimerRef.current = setInterval(() => {
          setSessionSeconds((s) => s + 1);
        }, 1000);
      }
    } else {
      if (sessionTimerRef.current) {
        clearInterval(sessionTimerRef.current);
        sessionTimerRef.current = null;
      }
    }
    return () => {
      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
    };
  }, [connectionState]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Helper to add message
  const addMessage = (sender: 'user' | 'agent', text: string) => {
    const newMsg: Message = {
      id: Math.random().toString(36).substring(7),
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);

    // Check periodically for lead information in transcript
    triggerLeadCheck([...messages, newMsg]);
  };

  // Check if lead details are present in the conversation
  const triggerLeadCheck = async (msgs: Message[]) => {
    if (msgs.length < 3) return;
    try {
      const fullTranscript = msgs.map((m) => `${m.sender.toUpperCase()}: ${m.text}`).join('\n');
      const res = await fetch('/api/extract-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: fullTranscript }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.lead && data.lead.hasContactDetails) {
          setExtractedLead(data.lead);
        }
      }
    } catch {
      // quiet fail on analysis
    }
  };

  // Start Real Voice Session
  const startVoiceSession = async () => {
    if (connectionState === 'connecting' || connectionState === 'listening' || connectionState === 'speaking') {
      return;
    }

    setErrorMessage(null);
    setConnectionState('connecting');

    // 1. Request Microphone Access
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      micStreamRef.current = stream;
      setMicPermission('granted');
    } catch (err: any) {
      console.error('Microphone access error:', err);
      setMicPermission('denied');
      setConnectionState('error');
      setErrorMessage(
        err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError'
          ? 'Microphone permission was denied. Please allow microphone access in your browser settings to test the AI voice agent.'
          : 'Could not access microphone. Please check your audio input device or try Text Chat mode.'
      );
      return;
    }

    // 2. Setup AudioContext for Capture (Resampled/PCM)
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx({ sampleRate: 16000 });
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(micStreamRef.current);
      // ScriptProcessorNode for raw PCM capture buffer
      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      source.connect(processor);
      processor.connect(audioCtx.destination);
    } catch (audioErr) {
      console.warn('AudioContext init error:', audioErr);
    }

    // 3. Connect to Server WebSocket
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/live-voice`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnectionState('listening');

        // Initial agent greeting if transcript is empty
        if (messages.length === 0) {
          addMessage(
            'agent',
            "Hello! Welcome to Ali AI Solutions. I'm your AI receptionist demo. What kind of business do you run, or what would you like to automate today?"
          );
          // Play introductory welcome speech
          playTTSGreeting("Hello! Welcome to Ali AI Solutions. I am your AI receptionist demo. What kind of business do you run, or what would you like to automate today?");
        }

        // Start streaming mic audio to WebSocket
        if (processorRef.current) {
          processorRef.current.onaudioprocess = (e) => {
            if (isMuted || ws.readyState !== WebSocket.OPEN) return;
            const inputData = e.inputBuffer.getChannelData(0);
            const pcmBuffer = floatTo16BitPCM(inputData);
            const base64Audio = arrayBufferToBase64(pcmBuffer);
            ws.send(JSON.stringify({ type: 'audio', audio: base64Audio }));
          };
        }

        // Setup speech recognition for live caller transcript if browser supports Web Speech API
        setupSpeechRecognition();
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'audio' && data.audio) {
            audioPlayerRef.current?.queueChunk(data.audio);
            if (data.text) {
              addMessage('agent', data.text);
            }
          } else if (data.type === 'textChunk' && data.text) {
            addMessage('agent', data.text);
          } else if (data.type === 'interrupted') {
            audioPlayerRef.current?.stop();
            setConnectionState('listening');
          } else if (data.type === 'error') {
            setErrorMessage(data.message || 'Error occurred during voice session.');
            setConnectionState('error');
          } else if (data.type === 'disconnected') {
            setConnectionState('disconnected');
          } else if (data.type === 'fallbackNotice') {
            // Live handshake completed
            setConnectionState('listening');
          }
        } catch (e) {
          console.warn('WebSocket message parse error:', e);
        }
      };

      ws.onerror = (e) => {
        console.warn('WebSocket connection error, activating turn fallback mode:', e);
        setConnectionState('listening');
      };

      ws.onclose = () => {
        if (connectionState !== 'error') {
          setConnectionState('disconnected');
        }
      };
    } catch (wsErr) {
      console.warn('WebSocket launch failed:', wsErr);
      setConnectionState('listening');
    }
  };

  // Web Speech API fallback for live user transcript
  const setupSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = language === 'auto' ? 'en-US' : language;

      recognition.onresult = (event: any) => {
        const lastResult = event.results[event.results.length - 1];
        if (lastResult.isFinal) {
          const spokenText = lastResult[0].transcript.trim();
          if (spokenText) {
            addMessage('user', spokenText);
            // Send text to server for conversational processing
            handleSpokenTurn(spokenText);
          }
        }
      };

      recognition.onerror = () => {
        // silent recovery
      };

      recognition.start();
      speechRecognitionRef.current = recognition;
    } catch {
      // not supported
    }
  };

  // Handle a user spoken sentence
  const handleSpokenTurn = async (userText: string) => {
    setConnectionState('thinking');
    try {
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text,
      }));
      history.push({ role: 'user', content: userText });

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history,
          languagePreference: language,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await res.json();
      const reply = data.reply || 'I understand. Could you tell me more about your requirements?';
      addMessage('agent', reply);

      // Synthesize audio response with female voice 'Kore'
      const ttsRes = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: reply, voiceName: 'Kore' }),
      });

      if (ttsRes.ok) {
        const ttsData = await ttsRes.json();
        if (ttsData.audioBase64) {
          audioPlayerRef.current?.queueChunk(ttsData.audioBase64);
        }
      }
    } catch (err: any) {
      console.error('Spoken turn error:', err);
      setConnectionState('listening');
    }
  };

  // Helper to play greeting via TTS
  const playTTSGreeting = async (text: string) => {
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceName: 'Kore' }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.audioBase64) {
          audioPlayerRef.current?.queueChunk(data.audioBase64);
        }
      }
    } catch {
      // ignore
    }
  };

  // End voice session and cleanup
  const cleanupSession = () => {
    if (wsRef.current) {
      if (wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'end' }));
      }
      wsRef.current.close();
      wsRef.current = null;
    }

    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {}
      speechRecognitionRef.current = null;
    }

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }

    if (audioPlayerRef.current) {
      audioPlayerRef.current.stop();
    }

    setConnectionState('disconnected');
  };

  // Start Again
  const handleStartAgain = () => {
    cleanupSession();
    setMessages([]);
    setExtractedLead(null);
    setShowLeadReview(false);
    setSessionSeconds(0);
    setErrorMessage(null);
    setConnectionState('idle');
  };

  // Handle Text Chat message submission
  const handleSendTextMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isTextLoading) return;

    const userText = chatInput.trim();
    setChatInput('');
    addMessage('user', userText);
    setIsTextLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text,
      }));
      history.push({ role: 'user', content: userText });

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history,
          languagePreference: language,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Server returned an error');
      }

      const data = await res.json();
      const reply = data.reply || 'How else can I assist with your business automation?';
      addMessage('agent', reply);

      // Optionally speak reply if user has audio enabled
      if (!isMuted) {
        fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: reply, voiceName: 'Kore' }),
        })
          .then((r) => r.json())
          .then((d) => {
            if (d.audioBase64) {
              audioPlayerRef.current?.queueChunk(d.audioBase64);
            }
          })
          .catch(() => {});
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMessage(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsTextLoading(false);
    }
  };

  // State color badges
  const stateBadge = {
    idle: { label: 'Ready to Connect', color: 'bg-slate-500/10 text-slate-300 border-slate-500/20' },
    connecting: { label: 'Connecting to Voice Core...', color: 'bg-amber-500/10 text-amber-300 border-amber-500/20 animate-pulse' },
    listening: { label: 'Listening to You', color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
    thinking: { label: 'Thinking / Processing', color: 'bg-purple-500/10 text-purple-300 border-purple-500/20 animate-pulse' },
    speaking: { label: 'AI Speaking (Kore)', color: 'bg-blue-500/10 text-blue-300 border-blue-500/20' },
    disconnected: { label: 'Conversation Ended', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
    error: { label: 'Session Notice', color: 'bg-rose-500/10 text-rose-300 border-rose-500/20' },
  }[connectionState];

  return (
    <section id="demo-console" className="py-20 relative overflow-hidden bg-[#080B14]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-blue-600/08 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Branding & Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-xs font-mono text-[#4F8CFF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LIVE INTERACTIVE AGENT DEMO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white text-balance">
            Meet Your <span className="text-gradient-electric">AI Receptionist.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Talk to our AI voice agent and experience how intelligent conversations can help your business.
          </p>
        </div>

        {/* Main Console Container */}
        <div className="rounded-3xl p-1 bg-gradient-to-b from-blue-500/25 via-purple-500/10 to-transparent shadow-2xl shadow-black/80">
          <div className="rounded-[22px] bg-[#0D1220] border border-white/[0.08] overflow-hidden flex flex-col">
            
            {/* Top Bar: Controls & Mode Switcher */}
            <div className="p-4 sm:p-5 bg-[#090C16] border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs">
              
              {/* Left: Mode Tabs & Voice Indicator */}
              <div className="flex items-center gap-3">
                <div className="p-1 rounded-xl bg-black/40 border border-white/5 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('voice')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'voice'
                        ? 'bg-[#4F8CFF] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Voice Agent</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('chat')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'chat'
                        ? 'bg-[#4F8CFF] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Try Text Chat</span>
                  </button>
                </div>

                <span className="hidden sm:inline-block font-mono text-[11px] text-slate-400">
                  Voice: <strong className="text-slate-200">Kore (Female)</strong>
                </span>
              </div>

              {/* Right: Language Selector & Status */}
              <div className="flex items-center gap-3">
                {/* Language Selector */}
                <div className="flex items-center gap-1.5 bg-black/30 border border-white/5 px-2.5 py-1 rounded-xl text-slate-300">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
                    aria-label="Language Selector"
                  >
                    <option value="auto" className="bg-[#090C16]">Auto Detect</option>
                    <option value="English" className="bg-[#090C16]">English</option>
                    <option value="Urdu" className="bg-[#090C16]">Urdu</option>
                    <option value="Hindi" className="bg-[#090C16]">Hindi</option>
                    <option value="Arabic" className="bg-[#090C16]">Arabic</option>
                    <option value="Spanish" className="bg-[#090C16]">Spanish</option>
                    <option value="French" className="bg-[#090C16]">French</option>
                  </select>
                </div>

                {/* Microphone Permission Status & Settings Trigger Button */}
                <button
                  type="button"
                  onClick={() => setShowMicSettingsModal(true)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                    micPermission === 'granted'
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25 hover:bg-emerald-500/20'
                      : micPermission === 'denied'
                      ? 'bg-rose-500/15 text-rose-300 border-rose-500/30 hover:bg-rose-500/25 animate-pulse'
                      : 'bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500/20'
                  }`}
                  title="Check or configure browser microphone settings"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mic:</span>
                  <span className="font-semibold">
                    {micPermission === 'granted' ? 'Allowed' : micPermission === 'denied' ? 'Blocked' : 'Ask'}
                  </span>
                  <Settings className="w-3 h-3 opacity-60 hover:opacity-100" />
                </button>

                {/* State Badge */}
                <span className={`px-2.5 py-1 rounded-full border text-[11px] font-mono ${stateBadge.color}`}>
                  {stateBadge.label}
                </span>

                {/* Timer if active */}
                {sessionSeconds > 0 && (
                  <span className="font-mono text-xs text-slate-400">
                    {formatTime(sessionSeconds)}
                  </span>
                )}
              </div>
            </div>

            {/* Error Message Banner */}
            {errorMessage && (
              <div className="p-3 bg-rose-500/10 border-b border-rose-500/20 px-5 flex items-center justify-between text-xs text-rose-300">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setErrorMessage(null)}
                  className="text-rose-400 hover:text-white underline cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Mic Permission Guidance Banner */}
            {micPermission === 'denied' && activeTab === 'voice' && (
              <div className="p-3.5 bg-amber-500/10 border-b border-amber-500/20 px-5 text-xs text-amber-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Info className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Microphone access is blocked in this browser. Please allow microphone in your browser address bar (lock/tune icon) or review the instructions.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowMicSettingsModal(true)}
                    className="px-3 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 font-semibold border border-amber-400/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>How to Enable</span>
                  </button>
                  <button
                    type="button"
                    onClick={requestMicPermission}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Retry Mic</span>
                  </button>
                </div>
              </div>
            )}

            {/* Central Interactive Stage */}
            <div className="p-6 sm:p-8 flex flex-col items-center justify-center relative">
              
              {activeTab === 'voice' ? (
                // VOICE MODE STAGE
                <div className="w-full flex flex-col items-center space-y-6">
                  
                  {/* Big Central Orb Visualizer with animated waveform */}
                  <div className="relative py-4 flex flex-col items-center justify-center">
                    {/* Concentric sound rings */}
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
                      <motion.div
                        animate={{
                          scale: connectionState === 'speaking' || connectionState === 'listening' ? [1, 1.28, 1] : [1, 1.05, 1],
                          opacity: connectionState === 'speaking' || connectionState === 'listening' ? [0.45, 0.1, 0.45] : [0.15, 0.05, 0.15],
                        }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-0 rounded-full border border-blue-400/40"
                      />
                      <motion.div
                        animate={{
                          scale: connectionState === 'speaking' ? [1, 1.45, 1] : [1, 1.1, 1],
                          opacity: connectionState === 'speaking' ? [0.3, 0.05, 0.3] : [0.1, 0.02, 0.1],
                        }}
                        transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -inset-4 rounded-full border border-purple-400/30"
                      />

                      {/* Main Orb Center / Click to Talk */}
                      <button
                        type="button"
                        onClick={connectionState === 'idle' || connectionState === 'disconnected' || connectionState === 'error' ? startVoiceSession : cleanupSession}
                        className={`w-36 h-36 sm:w-40 sm:h-40 rounded-full border flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 shadow-2xl cursor-pointer ${
                          connectionState === 'speaking'
                            ? 'bg-gradient-to-tr from-blue-900/60 via-purple-900/60 to-black border-blue-400/60 shadow-blue-500/30 scale-105'
                            : connectionState === 'listening'
                            ? 'bg-gradient-to-tr from-emerald-900/40 via-sky-900/40 to-black border-emerald-400/50 shadow-emerald-500/20'
                            : connectionState === 'connecting' || connectionState === 'thinking'
                            ? 'bg-gradient-to-tr from-purple-900/50 via-blue-900/50 to-black border-purple-400/50 animate-pulse'
                            : 'bg-[#111827] border-white/10 hover:border-blue-400/40 hover:bg-[#141E33] shadow-black/80'
                        }`}
                        aria-label="Microphone Voice Trigger"
                      >
                        <div className="absolute inset-0 bg-radial from-blue-500/10 via-transparent to-transparent pointer-events-none" />

                        {connectionState === 'speaking' ? (
                          <div className="flex items-center gap-1.5 h-12 z-10">
                            {[40, 75, 55, 95, 65, 100, 70, 50, 85, 60].map((h, i) => (
                              <motion.span
                                key={i}
                                animate={{ height: [`${h * 0.35}%`, `${h}%`, `${h * 0.4}%`] }}
                                transition={{ duration: 0.8 + (i % 3) * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                                className="w-1.5 rounded-full bg-[#4F8CFF]"
                              />
                            ))}
                          </div>
                        ) : connectionState === 'listening' ? (
                          <div className="flex flex-col items-center gap-1.5 z-10">
                            <Mic className="w-10 h-10 text-emerald-400 animate-pulse" />
                            <span className="text-[11px] font-mono text-emerald-300">Listening...</span>
                          </div>
                        ) : connectionState === 'connecting' || connectionState === 'thinking' ? (
                          <div className="flex flex-col items-center gap-1.5 z-10">
                            <Bot className="w-10 h-10 text-purple-400 animate-bounce" />
                            <span className="text-[11px] font-mono text-purple-300">Processing...</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2 z-10">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-[#4F8CFF]">
                              <Mic className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-semibold text-white">Test Voice Agent</span>
                          </div>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-slate-400 mt-3 text-center max-w-sm">
                      {connectionState === 'idle'
                        ? 'Click the orb or button below to speak directly with the AI receptionist.'
                        : connectionState === 'listening'
                        ? 'Speak naturally. The receptionist listens and adapts to your language.'
                        : connectionState === 'speaking'
                        ? 'AI receptionist is speaking. Start talking at any time to interrupt.'
                        : 'Connecting securely to the Ali AI Solutions voice model...'}
                    </p>
                  </div>

                  {/* Primary Voice Action Bar */}
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {connectionState === 'idle' || connectionState === 'disconnected' || connectionState === 'error' ? (
                      <button
                        type="button"
                        onClick={startVoiceSession}
                        className="px-6 py-3.5 rounded-2xl font-semibold text-sm text-white bg-gradient-to-r from-[#4F8CFF] to-[#8B5CF6] hover:from-[#3B7CFF] hover:to-[#7C3AED] shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                      >
                        <Mic className="w-4 h-4" />
                        <span>Test Voice Agent</span>
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setIsMuted(!isMuted)}
                          className={`p-3 rounded-xl border text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                            isMuted
                              ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                          }`}
                          title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                        >
                          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                          <span>{isMuted ? 'Muted' : 'Mute Mic'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={cleanupSession}
                          className="px-5 py-3 rounded-xl font-semibold text-xs text-white bg-rose-600 hover:bg-rose-500 transition-colors flex items-center gap-2 cursor-pointer active:scale-95"
                        >
                          <PhoneOff className="w-4 h-4" />
                          <span>End Conversation</span>
                        </button>
                      </>
                    )}

                    <button
                      type="button"
                      onClick={() => setShowMicSettingsModal(true)}
                      className="px-3.5 py-3 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Microphone browser settings and test"
                    >
                      <Settings className="w-3.5 h-3.5 text-blue-400" />
                      <span>Mic Settings</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleStartAgain}
                      className="px-4 py-3 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Clear session and start from beginning"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Start Again</span>
                    </button>
                  </div>

                </div>
              ) : (
                // TEXT CHAT MODE STAGE
                <div className="w-full space-y-4">
                  {/* Chat Message Scroll Area */}
                  <div className="h-80 overflow-y-auto space-y-3 p-4 rounded-2xl bg-black/40 border border-white/5">
                    {messages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-2">
                        <Bot className="w-10 h-10 text-blue-400" />
                        <p className="text-sm font-semibold text-slate-200">Start text chat with Ali AI Receptionist</p>
                        <p className="text-xs max-w-sm">
                          Ask about AI voice agents, business automation, or responsive websites.
                        </p>
                      </div>
                    ) : (
                      messages.map((m) => (
                        <div
                          key={m.id}
                          className={`flex items-start gap-3 text-xs sm:text-sm ${
                            m.sender === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          {m.sender === 'agent' && (
                            <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-[#4F8CFF] flex items-center justify-center shrink-0">
                              <Bot className="w-4 h-4" />
                            </div>
                          )}

                          <div
                            className={`p-3.5 rounded-2xl max-w-[80%] leading-relaxed ${
                              m.sender === 'user'
                                ? 'bg-[#4F8CFF] text-white rounded-tr-none'
                                : 'bg-[#111827] border border-white/10 text-slate-200 rounded-tl-none'
                            }`}
                          >
                            <p>{m.text}</p>
                            <span className="block text-[10px] text-slate-400 mt-1 text-right">
                              {m.timestamp}
                            </span>
                          </div>

                          {m.sender === 'user' && (
                            <div className="w-7 h-7 rounded-lg bg-white/10 text-slate-300 flex items-center justify-center shrink-0">
                              <User className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      ))
                    )}
                    {isTextLoading && (
                      <div className="flex items-center gap-2 text-xs text-purple-400 p-2">
                        <Bot className="w-4 h-4 animate-spin" />
                        <span>AI Receptionist is drafting a reply...</span>
                      </div>
                    )}
                    <div ref={transcriptEndRef} />
                  </div>

                  {/* Chat Input Bar */}
                  <form onSubmit={handleSendTextMessage} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type a question for the AI receptionist..."
                      className="flex-1 px-4 py-3 rounded-xl bg-[#090C16] border border-white/10 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      disabled={isTextLoading || !chatInput.trim()}
                      className="px-5 py-3 rounded-xl bg-[#4F8CFF] hover:bg-[#3B7CFF] disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Send</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}

            </div>

            {/* Live Conversation Transcript Drawer (for Voice Mode) */}
            {activeTab === 'voice' && messages.length > 0 && (
              <div className="border-t border-white/[0.06] p-5 bg-[#090C16]/80 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-2 font-semibold text-slate-300">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                    Live Conversation Transcript
                  </span>
                  <span>{messages.length} messages logged</span>
                </div>

                <div className="max-h-48 overflow-y-auto space-y-2.5 pr-2">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`p-3 rounded-xl text-xs ${
                        m.sender === 'agent'
                          ? 'bg-blue-500/[0.06] border border-blue-500/15 text-slate-200'
                          : 'bg-white/[0.03] border border-white/5 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span className={m.sender === 'agent' ? 'text-[#4F8CFF] font-semibold' : 'text-slate-400 font-semibold'}>
                          {m.sender === 'agent' ? 'Ali AI Receptionist (Kore)' : 'Caller (You)'}
                        </span>
                        <span className="text-slate-500">{m.timestamp}</span>
                      </div>
                      <p className="leading-relaxed">{m.text}</p>
                    </div>
                  ))}
                  <div ref={transcriptEndRef} />
                </div>
              </div>
            )}

            {/* Lead Qualification Review Screen (Section 6 requirement) */}
            {extractedLead && extractedLead.hasContactDetails && (
              <div className="p-5 bg-gradient-to-r from-blue-950/40 to-purple-950/40 border-t border-blue-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-semibold text-blue-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Captured Lead Qualification Summary</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Demo Review Screen</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
                  {extractedLead.name && (
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div className="text-[10px] text-slate-400 font-mono">Name:</div>
                      <div className="font-semibold text-white">{extractedLead.name}</div>
                    </div>
                  )}
                  {extractedLead.businessName && (
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div className="text-[10px] text-slate-400 font-mono">Business Name:</div>
                      <div className="font-semibold text-white">{extractedLead.businessName}</div>
                    </div>
                  )}
                  {extractedLead.businessType && (
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div className="text-[10px] text-slate-400 font-mono">Industry:</div>
                      <div className="font-semibold text-white">{extractedLead.businessType}</div>
                    </div>
                  )}
                  {extractedLead.interestedService && (
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div className="text-[10px] text-slate-400 font-mono">Interested Service:</div>
                      <div className="font-semibold text-white">{extractedLead.interestedService}</div>
                    </div>
                  )}
                  {extractedLead.contactMethod && (
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div className="text-[10px] text-slate-400 font-mono">Contact Info:</div>
                      <div className="font-semibold text-white">{extractedLead.contactMethod}</div>
                    </div>
                  )}
                  {extractedLead.requirements && (
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 sm:col-span-2">
                      <div className="text-[10px] text-slate-400 font-mono">Requirements:</div>
                      <div className="text-slate-200">{extractedLead.requirements}</div>
                    </div>
                  )}
                </div>

                {/* Quick WhatsApp or Email dispatch of the captured lead */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <div className="text-[11px] text-slate-400">
                    * Demo notice: Information is reviewed in-browser and has not been submitted yet.
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/923106449454?text=${encodeURIComponent(
                        `Hi Ali AI Solutions, here are the details from my AI Receptionist conversation:\nName: ${extractedLead.name || 'Visitor'}\nBusiness: ${extractedLead.businessName || 'Business'}\nService: ${extractedLead.interestedService || 'AI Voice Agent'}\nRequirements: ${extractedLead.requirements || ''}\nContact: ${extractedLead.contactMethod || ''}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Send to Ali AI on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Demo Notice (Requirement 2 & 9) */}
            <div className="p-3.5 bg-[#070A12] border-t border-white/[0.06] text-center text-[11px] text-slate-500">
              <span>This is an official AI-powered live demonstration of Ali AI Solutions. Speak naturally into your microphone or use Text Chat. Responses are generated securely server-side.</span>
            </div>

          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* BROWSER MICROPHONE PERMISSION SETTINGS & TESTING MODAL   */}
      {/* ======================================================== */}
      <AnimatePresence>
        {showMicSettingsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg rounded-2xl bg-[#0D1220] border border-blue-500/30 shadow-2xl shadow-blue-500/20 overflow-hidden flex flex-col text-slate-200"
            >
              {/* Modal Header */}
              <div className="p-5 bg-[#090C16] border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-[#4F8CFF]">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      Microphone Permission & Settings
                    </h3>
                    <p className="text-xs text-slate-400">
                      Browser settings guide & live hardware test
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowMicSettingsModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
                
                {/* Current Status Card */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">Current Browser Status:</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono flex items-center gap-1.5 ${
                        micPermission === 'granted'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : micPermission === 'denied'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {micPermission === 'granted' ? (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Allowed (Permission Granted)</span>
                        </>
                      ) : micPermission === 'denied' ? (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                          <span>Blocked (Permission Denied)</span>
                        </>
                      ) : (
                        <>
                          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Prompt / Not Requested Yet</span>
                        </>
                      )}
                    </span>
                  </div>

                  {micDeviceLabel && (
                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="truncate">Active device: <strong className="text-slate-200">{micDeviceLabel}</strong></span>
                    </div>
                  )}

                  {/* Test & Request Button */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={requestMicPermission}
                      disabled={isTestingMic}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Mic className={`w-4 h-4 ${isTestingMic ? 'animate-pulse text-amber-300' : ''}`} />
                      <span>{isTestingMic ? 'Testing audio level...' : 'Ask Permission & Test Mic Now'}</span>
                    </button>
                  </div>

                  {/* Level indicator during test */}
                  {isTestingMic && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Speak into microphone to test level:</span>
                        <span>{micTestLevel}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-75"
                          style={{ width: `${micTestLevel}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Step-by-Step Instructions based on Browser/Device */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-blue-400" />
                    Browser Settings instructions (Agar Permission Block Ho Gayi Ho)
                  </h4>

                  {/* Chrome / Edge on Desktop */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs">
                    <div className="font-semibold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      Google Chrome & Microsoft Edge (Desktop / PC / Mac)
                    </div>
                    <ol className="list-decimal list-inside space-y-1 text-slate-300 pl-1 text-[11px] leading-relaxed">
                      <li>Browser ke top address bar mein <strong>Lock 🔒 ya Tune ⚙️ icon</strong> par click karein.</li>
                      <li><strong>Microphone</strong> ke samnay dropdown se <strong>Allow / On</strong> select karein.</li>
                      <li>Page refresh karein ya <strong>"Ask Permission & Test Mic Now"</strong> par click karein.</li>
                    </ol>
                  </div>

                  {/* Android Phones (Chrome) */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs">
                    <div className="font-semibold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Android Phones (Chrome Browser)
                    </div>
                    <ol className="list-decimal list-inside space-y-1 text-slate-300 pl-1 text-[11px] leading-relaxed">
                      <li>URL bar ke sath <strong>Lock 🔒 ya Tune icon</strong> tap karein.</li>
                      <li><strong>Permissions ➔ Microphone</strong> ko <strong>Allowed</strong> par set karein.</li>
                      <li>Agar option na dikhe to Chrome ke 3-dots ➔ <strong>Settings ➔ Site settings ➔ Microphone</strong> check karein.</li>
                    </ol>
                  </div>

                  {/* iPhone / Safari */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs">
                    <div className="font-semibold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      iPhone / iPad (Safari)
                    </div>
                    <ol className="list-decimal list-inside space-y-1 text-slate-300 pl-1 text-[11px] leading-relaxed">
                      <li>Address bar ke left par <strong>aA icon</strong> par tap karein ➔ <strong>Website Settings</strong>.</li>
                      <li><strong>Microphone</strong> ko <strong>Allow</strong> karein.</li>
                      <li>iPhone <strong>Settings ➔ Safari ➔ Microphone</strong> ko bhi Allow rakhein.</li>
                    </ol>
                  </div>
                </div>

                {/* Text chat fallback note */}
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 flex items-center justify-between gap-3">
                  <span>Microphone use na karna ho to aap hamari receptionist se <strong>Text Chat</strong> mein baat kar sakte hain.</span>
                  <button
                    type="button"
                    onClick={() => {
                      setShowMicSettingsModal(false);
                      setActiveTab('chat');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#4F8CFF] hover:bg-[#3B7CFF] text-white font-medium shrink-0 cursor-pointer"
                  >
                    Open Text Chat
                  </button>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-[#090C16] border-t border-white/[0.08] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowMicSettingsModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
