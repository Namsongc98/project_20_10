import { onBeforeUnmount, onMounted } from 'vue'

// Dùng event.code (vị trí phím vật lý) thay vì event.key để không bị bộ gõ tiếng Việt (Telex/VNI) làm sai phím.
const CODE_TO_ACTION = {
  ArrowRight: 'next',
  PageDown: 'next',
  ArrowLeft: 'prev',
  PageUp: 'prev',
  KeyQ: 'toggleAnswer',
  KeyF: 'toggleMusic',
  KeyP: 'playSlideMusic',
  KeyV: 'applause',
  KeyT: 'toggleFullscreen',
  KeyH: 'toggleHelp',
  KeyM: 'toggleSound',
  Escape: 'escape',
}

const DIGIT_CODE = /^(?:Digit|Numpad)([1-9])$/

// Bộ gõ tiếng Việt (OpenKey, EVKey, Unikey…) khi bỏ dấu sẽ xoá chữ trước rồi gửi lại chữ có dấu bằng một
// phím giả mang code của phím chữ cái — vd. Telex "a" + "f" → Backspace + "à" với code KeyA, làm phím đó
// bị kích hoạt thêm một lần. Phím thật có key là ký tự ASCII hoặc tên phím; phím giả có key là chữ có dấu → bỏ qua.
function isImeEvent(event) {
  if (event.isComposing || event.keyCode === 229 || event.key === 'Process') return true
  return event.key.length === 1 && /[^\x20-\x7E]/.test(event.key)
}

function isTypingTarget(target) {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

/**
 * Gắn phím điều khiển toàn cục.
 * @param {Object} handlers - { next, prev, goTo(index), toggleAnswer, toggleFullscreen, toggleHelp, toggleSound, toggleMusic, playSlideMusic, applause, escape }
 */
export function useKeyboardControls(handlers) {
  function onKeydown(event) {
    // Bỏ qua khi đang nhập liệu hoặc khi dùng tổ hợp phím của trình duyệt/hệ điều hành
    if (isTypingTarget(event.target)) return
    if (event.metaKey || event.ctrlKey || event.altKey) return
    if (isImeEvent(event)) return

    const digit = event.code.match(DIGIT_CODE)
    if (digit) {
      event.preventDefault()
      handlers.goTo?.(Number(digit[1]) - 1)
      return
    }

    // Space chưa gán chức năng nhưng vẫn chặn để trang không cuộn
    if (event.code === 'Space') {
      event.preventDefault()
      return
    }

    const action = CODE_TO_ACTION[event.code]
    if (!action) return

    // Giữ phím điều hướng không được nhảy liên tục nhiều màn
    if (event.repeat && (action === 'next' || action === 'prev')) {
      event.preventDefault()
      return
    }

    event.preventDefault()
    handlers[action]?.()
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
}

export function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen?.().catch(() => {})
  } else {
    document.documentElement.requestFullscreen?.().catch(() => {})
  }
}
