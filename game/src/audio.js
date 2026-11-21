// audio.js — tiny WebAudio bleeps, no audio files needed.
// Everything is synthesized with oscillators so the game ships
// with zero assets. Sounds only start after a user gesture.

let ctx = null;
let muted = false;

function ensure() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function setMuted(value) {
  muted = value;
}

export function isMuted() {
  return muted;
}

function blip(freq, dur, type = "sine", gain = 0.12, when = 0) {
  if (muted) return;
  const ac = ensure();
  if (!ac) return;
  const t = ac.currentTime + when;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  osc.connect(g);
  g.connect(ac.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

export function playFound() {
  blip(660, 0.12, "sine", 0.14);
  blip(880, 0.16, "sine", 0.12, 0.08);
}

export function playWrong() {
  blip(180, 0.18, "square", 0.06);
}

export function playHint() {
  blip(520, 0.1, "triangle", 0.1);
  blip(780, 0.12, "triangle", 0.08, 0.07);
}

export function playLevelClear() {
  [523, 659, 784, 1047].forEach((f, i) => blip(f, 0.18, "sine", 0.12, i * 0.09));
}

export function playWin() {
  [523, 659, 784, 1047, 1319].forEach((f, i) => blip(f, 0.22, "sine", 0.12, i * 0.11));
}

export function playTick() {
  blip(980, 0.05, "sine", 0.05);
}
