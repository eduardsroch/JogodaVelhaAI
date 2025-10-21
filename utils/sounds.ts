// Use a singleton pattern to ensure only one AudioContext is created.
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window !== 'undefined' && !audioContext) {
    try {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch(e) {
        console.error("Web Audio API is not supported in this browser");
        return null;
    }
  }
  return audioContext;
};

type SoundType = 'place' | 'win' | 'draw';

export const playSound = (sound: SoundType) => {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Browsers may require a user interaction to start the audio context.
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  // Set a master volume.
  gainNode.gain.setValueAtTime(0.1, ctx.currentTime);

  switch (sound) {
    case 'place':
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440.0, ctx.currentTime); // A4
      gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
      break;
    case 'win':
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      oscillator.frequency.linearRampToValueAtTime(1046.50, ctx.currentTime + 0.3); // C6
      gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.5);
      break;
    case 'draw':
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(440, ctx.currentTime); // A4
        oscillator.frequency.linearRampToValueAtTime(220, ctx.currentTime + 0.2); // A3
        gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.3);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
        break;
  }
};
