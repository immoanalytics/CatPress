import { useRef, useCallback } from 'react';

function synthesizeMeow(ctx, baseFreq, duration) {
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  const peakFreq = baseFreq * 1.6;
  const endFreq = baseFreq * 0.7;
  const attackTime = 0.03;
  const peakTime = duration * 0.15;
  const sustainEnd = duration * 0.5;

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const tNorm = t / duration;

    // Frequency envelope: rise to peak, then fall
    let freq;
    if (t < peakTime) {
      freq = baseFreq + (peakFreq - baseFreq) * (t / peakTime);
    } else {
      freq = peakFreq - (peakFreq - endFreq) * ((t - peakTime) / (duration - peakTime));
    }

    // Amplitude envelope
    let amp;
    if (t < attackTime) {
      amp = t / attackTime;
    } else if (t < sustainEnd) {
      amp = 1.0;
    } else {
      amp = Math.max(0, 1.0 - (t - sustainEnd) / (duration - sustainEnd));
    }

    // Add slight vibrato
    const vibrato = Math.sin(2 * Math.PI * 5.5 * t) * 12;

    // Main tone + harmonics for richer sound
    const sample =
      Math.sin(2 * Math.PI * (freq + vibrato) * t) * 0.5 +
      Math.sin(2 * Math.PI * (freq + vibrato) * 1.5 * t) * 0.15 +
      Math.sin(2 * Math.PI * (freq + vibrato) * 2 * t) * 0.08;

    data[i] = sample * amp * 0.4;
  }

  return buffer;
}

function synthesizeChime(ctx) {
  const duration = 0.3;
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const amp = Math.max(0, 1 - t / duration);
    data[i] = (
      Math.sin(2 * Math.PI * 880 * t) * 0.3 +
      Math.sin(2 * Math.PI * 1320 * t) * 0.2 +
      Math.sin(2 * Math.PI * 1760 * t) * 0.1
    ) * amp * 0.35;
  }

  return buffer;
}

function synthesizeFanfare(ctx) {
  const duration = 0.8;
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    let sample = 0;

    for (let n = 0; n < notes.length; n++) {
      const noteStart = n * 0.15;
      const noteT = t - noteStart;
      if (noteT < 0) continue;
      const noteAmp = Math.max(0, 1 - noteT / (duration - noteStart));
      sample += Math.sin(2 * Math.PI * notes[n] * noteT) * noteAmp * 0.15;
    }

    data[i] = sample * 0.5;
  }

  return buffer;
}

export function useSoundEngine() {
  const ctxRef = useRef(null);
  const buffersRef = useRef({});
  const initRef = useRef(false);

  const initialize = useCallback(async () => {
    if (initRef.current) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      ctxRef.current = ctx;

      // Generate meow variations
      buffersRef.current.meow1 = synthesizeMeow(ctx, 450, 0.28);
      buffersRef.current.meow2 = synthesizeMeow(ctx, 520, 0.32);
      buffersRef.current.meow3 = synthesizeMeow(ctx, 380, 0.35);
      buffersRef.current.meow4 = synthesizeMeow(ctx, 600, 0.22);

      // Effects
      buffersRef.current.upgrade = synthesizeChime(ctx);
      buffersRef.current.milestone = synthesizeFanfare(ctx);

      initRef.current = true;
    } catch (e) {
      console.warn('Audio init failed:', e);
    }
  }, []);

  const playBuffer = useCallback((name, opts = {}) => {
    const ctx = ctxRef.current;
    const buffer = buffersRef.current[name];
    if (!ctx || !buffer) return;

    try {
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      source.buffer = buffer;
      source.playbackRate.value = opts.playbackRate || 1;
      gain.gain.value = opts.volume || 0.6;
      source.connect(gain).connect(ctx.destination);
      source.start(0);
    } catch (e) {
      // Ignore playback errors silently
    }
  }, []);

  const playMeow = useCallback(() => {
    if (!initRef.current) {
      initialize();
      return;
    }
    const idx = Math.floor(Math.random() * 4) + 1;
    playBuffer(`meow${idx}`, {
      playbackRate: 0.9 + Math.random() * 0.2,
      volume: 0.5,
    });
  }, [initialize, playBuffer]);

  const playUpgrade = useCallback(() => {
    playBuffer('upgrade', { volume: 0.6 });
  }, [playBuffer]);

  const playMilestone = useCallback(() => {
    playBuffer('milestone', { volume: 0.7 });
  }, [playBuffer]);

  return { initialize, playMeow, playUpgrade, playMilestone };
}
