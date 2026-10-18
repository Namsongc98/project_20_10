import { watch } from 'vue'
import { useSoundEffects } from '@/composables/useSoundEffects'
import { slideMusic, soundEffects } from '@/data/music'
import { assetUrl } from '@/utils/assetUrl'

// Nhạc nền theo màn + âm thanh hiệu ứng từ file (singleton, dùng chung toàn app).
// Mỗi file có một <audio> riêng được giữ lại, nên quay lại màn cũ thì nhạc chạy tiếp từ chỗ đã dừng.
const FADE_MS = 900
const DUCK_LEVEL = 0.3

const audios = new Map()
const fadeTimers = new Map()
// Nhạc nền của màn đang mở: { src, audio, volume, wantPlaying }. wantPlaying là ý muốn của MC (phát/dừng),
// không suy ra từ audio.paused vì trong lúc nhỏ dần trước khi dừng, audio vẫn đang phát.
let current = null
let slideConfig = null
let isBlocked = false // trình duyệt chặn tự phát cho tới khi người dùng bấm phím
let duckCount = 0

const { isMuted } = useSoundEffects()

function getAudio(src, loop) {
  if (!audios.has(src)) {
    const audio = new Audio(assetUrl(src))
    audio.preload = 'auto'
    audio.loop = loop
    audio.muted = isMuted.value
    audios.set(src, audio)
  }
  return audios.get(src)
}

function fade(audio, to, onDone) {
  window.clearInterval(fadeTimers.get(audio))
  const from = audio.volume
  const steps = Math.max(1, Math.round(FADE_MS / 30))
  let step = 0
  const timer = window.setInterval(() => {
    step += 1
    audio.volume = Math.min(1, Math.max(0, from + ((to - from) * step) / steps))
    if (step >= steps) {
      window.clearInterval(timer)
      fadeTimers.delete(audio)
      onDone?.()
    }
  }, 30)
  fadeTimers.set(audio, timer)
}

function targetVolume() {
  return current ? current.volume * (duckCount > 0 ? DUCK_LEVEL : 1) : 0
}

function fadeIn() {
  if (!current) return
  current.wantPlaying = true
  const { audio } = current
  audio
    .play()
    .then(() => {
      isBlocked = false
      fade(audio, targetVolume())
    })
    .catch(() => {
      // Chưa có thao tác của người dùng: chờ lần bấm phím đầu tiên rồi phát
      isBlocked = true
    })
}

function fadeOutAndPause(track) {
  if (!track) return
  track.wantPlaying = false
  fade(track.audio, 0, () => track.audio.pause())
}

function startTrack({ src, volume }) {
  // Cùng file với màn trước (welcome → opening): giữ nguyên, kể cả trạng thái đang dừng
  if (current?.src === src) {
    current.volume = volume
    if (current.wantPlaying) fade(current.audio, targetVolume())
    return
  }
  fadeOutAndPause(current)
  const audio = getAudio(src, true)
  audio.volume = 0
  current = { src, audio, volume, wantPlaying: false }
  fadeIn()
}

function stopTrack() {
  fadeOutAndPause(current)
  current = null
}

/** Gọi mỗi khi đổi màn */
function enterSlide(slideId) {
  slideConfig = slideMusic[slideId] ?? null
  if (slideConfig?.autoplay) startTrack(slideConfig)
  else if (current?.src !== slideConfig?.src) stopTrack()
}

/** Phím P: chạy nhạc của màn không tự chạy (màn Lời chúc lãnh đạo) */
function playSlideMusic() {
  if (!slideConfig || slideConfig.autoplay) return
  if (current?.src === slideConfig.src && current.wantPlaying) return
  if (current?.src === slideConfig.src) fadeIn()
  else startTrack(slideConfig)
}

/** Phím F: dừng / tiếp tục nhạc nền đang có */
function toggleMusic() {
  if (!current) return
  if (current.wantPlaying && !isBlocked) fadeOutAndPause(current)
  else fadeIn()
}

/** Phát một hiệu ứng (ta-da, vỗ tay) từ đầu; nhạc nền nhỏ lại trong lúc phát */
function playEffect(name) {
  const effect = soundEffects[name]
  if (!effect || isMuted.value) return
  const audio = getAudio(effect.src, false)
  audio.currentTime = 0
  audio.volume = effect.volume
  audio
    .play()
    .then(() => {
      duckCount += 1
      if (current?.wantPlaying) fade(current.audio, targetVolume())
      audio.addEventListener(
        'ended',
        () => {
          duckCount = Math.max(0, duckCount - 1)
          if (current?.wantPlaying) fade(current.audio, targetVolume())
        },
        { once: true },
      )
    })
    .catch(() => {})
}

// Phím M tắt/bật toàn bộ âm thanh, kể cả nhạc nền
watch(isMuted, (muted) => audios.forEach((audio) => (audio.muted = muted)))

// Mở khoá tự phát ở lần bấm phím/click đầu tiên. Bỏ qua phím F để phím đó tự quyết định phát hay dừng.
function unlock(event) {
  if (!isBlocked || event.code === 'KeyF') return
  fadeIn()
}
window.addEventListener('keydown', unlock, true)
window.addEventListener('pointerdown', unlock, true)

export function useMusic() {
  return { enterSlide, playSlideMusic, toggleMusic, playEffect }
}
