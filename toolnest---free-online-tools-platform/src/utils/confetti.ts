import confetti from 'canvas-confetti';

export function fireCelebration() {
  try {
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#2563eb', '#38bdf8', '#10b981', '#f59e0b'],
      disableForReducedMotion: true,
    });
  } catch (e) {}
}
