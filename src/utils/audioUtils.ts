/**
 * Audio processing utilities for real-time voice streaming with Gemini.
 * Handles microphone capture (16kHz PCM Int16 LE) and smooth 24kHz playback.
 */

// Convert Float32Array audio buffer (-1.0 to 1.0) to 16-bit Linear PCM (Int16 Little Endian)
export function floatTo16BitPCM(float32Array: Float32Array): ArrayBuffer {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  let offset = 0;
  for (let i = 0; i < float32Array.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
}

// Convert ArrayBuffer to Base64
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Decode Base64 string to Uint8Array
export function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Audio queue player for gapless playback of raw 24kHz 16-bit PCM chunks
export class AudioQueuePlayer {
  private audioCtx: AudioContext | null = null;
  private nextPlayTime = 0;
  private activeSources: AudioBufferSourceNode[] = [];
  private sampleRate = 24000;
  public onPlayStateChange?: (isPlaying: boolean) => void;

  constructor(sampleRate = 24000) {
    this.sampleRate = sampleRate;
  }

  public init() {
    if (!this.audioCtx || this.audioCtx.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtx({ sampleRate: this.sampleRate });
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    this.nextPlayTime = this.audioCtx.currentTime;
  }

  // Explicit user-gesture unlock for mobile (Android Chrome, iOS Safari)
  public unlock() {
    this.init();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
  }

  // Play a chunk of base64-encoded raw 16-bit PCM (24kHz mono)
  public queueChunk(base64PCM: string) {
    this.init();
    if (!this.audioCtx) return;

    try {
      const pcmBytes = base64ToUint8Array(base64PCM);
      // If it's a WAV file (starts with 'RIFF'), decode through native audioCtx.decodeAudioData
      if (pcmBytes.length > 44 && pcmBytes[0] === 0x52 && pcmBytes[1] === 0x49 && pcmBytes[2] === 0x46 && pcmBytes[3] === 0x46) {
        const wavBuffer = pcmBytes.buffer.slice(pcmBytes.byteOffset, pcmBytes.byteOffset + pcmBytes.byteLength) as ArrayBuffer;
        this.audioCtx.decodeAudioData(wavBuffer, (audioBuffer) => {
          this.playAudioBuffer(audioBuffer);
        });
        return;
      }

      // Raw 16-bit PCM LE: 2 bytes per sample
      const int16 = new Int16Array(pcmBytes.buffer, pcmBytes.byteOffset, pcmBytes.byteLength / 2);
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / 32768.0;
      }

      const audioBuffer = this.audioCtx.createBuffer(1, float32.length, this.sampleRate);
      audioBuffer.getChannelData(0).set(float32);

      this.playAudioBuffer(audioBuffer);
    } catch (err) {
      console.warn('Error decoding audio chunk:', err);
    }
  }

  private playAudioBuffer(audioBuffer: AudioBuffer) {
    if (!this.audioCtx) return;

    const source = this.audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioCtx.destination);

    const currentTime = this.audioCtx.currentTime;
    // Schedule ahead for smooth gapless playback
    const startAt = Math.max(currentTime, this.nextPlayTime);
    source.start(startAt);
    this.nextPlayTime = startAt + audioBuffer.duration;

    this.activeSources.push(source);
    if (this.onPlayStateChange) this.onPlayStateChange(true);

    source.onended = () => {
      const idx = this.activeSources.indexOf(source);
      if (idx !== -1) this.activeSources.splice(idx, 1);
      if (this.activeSources.length === 0 && this.onPlayStateChange) {
        this.onPlayStateChange(false);
      }
    };
  }

  // Immediately stop all playing audio (for interruptions)
  public stop() {
    for (const source of this.activeSources) {
      try {
        source.stop();
        source.disconnect();
      } catch {
        // already stopped
      }
    }
    this.activeSources = [];
    if (this.audioCtx) {
      this.nextPlayTime = this.audioCtx.currentTime;
    }
    if (this.onPlayStateChange) this.onPlayStateChange(false);
  }

  public close() {
    this.stop();
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      this.audioCtx.close();
      this.audioCtx = null;
    }
  }
}
