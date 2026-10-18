import { ref } from 'vue'

// Âm thanh hiệu ứng tự tổng hợp bằng Web Audio API — không cần file, chạy offline, không lo bản quyền.
// Trình duyệt chỉ cho phát âm thanh sau khi người dùng bấm phím, nên AudioContext được tạo lúc phát lần đầu.
const isMuted = ref(false)

let audioContext = null
let master = null
let activeGroup = null

// Thang ngũ cung C5–A5: các nốt liền nhau luôn nghe hài hoà dù phát bao nhiêu ô
const SCALE = [523.25, 587.33, 659.25, 783.99, 880]
// Tiếng ting phát khi ô lật gần xong (ô lật trong 600ms, rõ chữ ở khoảng 60%)
const TILE_SOUND_OFFSET = 0.25

function getContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return null
    audioContext = new AudioContextClass()
    master = audioContext.createGain()
    master.gain.value = 0.35
    master.connect(audioContext.destination)
  }
  if (audioContext.state === 'suspended') audioContext.resume()
  return audioContext
}

// Một nốt kiểu chuông: lên nhanh, tắt dần; thêm bồi âm quãng tám cho tiếng trong
function bell(context, output, frequency, start, { duration = 0.4, peak = 0.5 } = {}) {
  ;[
    [frequency, peak],
    [frequency * 2, peak * 0.25],
  ].forEach(([freq, level]) => {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(freq, start)
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(level, start + 0.012)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
    oscillator.connect(gain).connect(output)
    oscillator.start(start)
    oscillator.stop(start + duration + 0.05)
  })
}

function stopReveal() {
  if (!activeGroup || !audioContext) return
  const group = activeGroup
  activeGroup = null
  group.gain.setTargetAtTime(0, audioContext.currentTime, 0.02)
  window.setTimeout(() => group.disconnect(), 200)
}

/**
 * Phát tiếng ting cho từng ô, khớp nhịp lật ô (tiếng ta-da là file riêng, xem useMusic).
 * @param {number} count - số ô chữ
 * @param {number} stepMs - khoảng cách giữa 2 ô (ms), trùng với animationDelay của ô chữ
 */
function playReveal(count, stepMs) {
  stopReveal()
  if (isMuted.value || count <= 0) return
  const context = getContext()
  if (!context) return

  const group = context.createGain()
  group.connect(master)
  activeGroup = group

  const start = context.currentTime + TILE_SOUND_OFFSET
  const step = stepMs / 1000
  for (let i = 0; i < count; i++) {
    bell(context, group, SCALE[i % SCALE.length], start + i * step, { duration: 0.35, peak: 0.45 })
  }
}

function toggleMute() {
  isMuted.value = !isMuted.value
  if (isMuted.value) stopReveal()
}

export function useSoundEffects() {
  return { isMuted, playReveal, stopReveal, toggleMute }
}
