import { onBeforeUnmount, onMounted } from 'vue'

// Ẩn con trỏ chuột sau một khoảng không di chuyển, hiện lại khi chuột di chuyển
export function useIdleCursor(delay = 2000) {
  const root = document.documentElement
  let timer = null

  function hideLater() {
    root.classList.remove('is-cursor-hidden')
    clearTimeout(timer)
    timer = setTimeout(() => root.classList.add('is-cursor-hidden'), delay)
  }

  onMounted(() => {
    window.addEventListener('mousemove', hideLater)
    hideLater()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', hideLater)
    clearTimeout(timer)
    root.classList.remove('is-cursor-hidden')
  })
}
