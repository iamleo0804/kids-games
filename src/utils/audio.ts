/**
 * 兒童友善音效系統
 * 使用 Web Audio API 即時合成音效，無需額外下載音訊檔。
 */

let audioCtx: AudioContext | null = null;

const getAudioCtx = () => {
  if (!audioCtx) {
    audioCtx = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
  }
  return audioCtx;
};

/**
 * 播放答對音效：一個輕快、向上的大調分解和弦
 */
export const playCorrectSound = () => {
  const ctx = getAudioCtx();
  const now = ctx.currentTime;

  const playNote = (freq: number, startTime: number, duration: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine"; // 圓潤的音色
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  };

  // C 大調分解：C5, E5, G5, C6
  playNote(523.25, now, 0.3);
  playNote(659.25, now + 0.1, 0.3);
  playNote(783.99, now + 0.2, 0.3);
  playNote(1046.5, now + 0.3, 0.5);
};

/**
 * 播放答錯音效：一個低沉、短促的下降音
 */
export const playIncorrectSound = () => {
  const ctx = getAudioCtx();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "square"; // 稍微粗糙一點的聲音，表示錯誤
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.3);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.3);
};

/**
 * 播放普通點擊音效
 */
export const playClickSound = () => {
  const ctx = getAudioCtx();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(440, now + 0.1);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.1);
};
