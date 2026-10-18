import { computed, ref } from 'vue'
import { slides } from '@/slides'

// State dùng chung toàn app (singleton), chỉ giữ trong bộ nhớ — tải lại trang sẽ về màn Welcome
const currentSlideIndex = ref(initialSlideIndex())

// Chỉ khi dev: ?slide=N (1–6) mở thẳng màn N để kiểm tra giao diện
function initialSlideIndex() {
  if (!import.meta.env.DEV) return 0
  const slide = Number(new URLSearchParams(window.location.search).get('slide'))
  return slide >= 1 && slide <= slides.length ? slide - 1 : 0
}

export function usePresentation() {
  const currentSlide = computed(() => slides[currentSlideIndex.value])
  const isFirst = computed(() => currentSlideIndex.value === 0)
  const isLast = computed(() => currentSlideIndex.value === slides.length - 1)

  function goTo(index) {
    if (index < 0 || index >= slides.length) return
    currentSlideIndex.value = index
  }

  function next() {
    if (!isLast.value) goTo(currentSlideIndex.value + 1)
  }

  function prev() {
    if (!isFirst.value) goTo(currentSlideIndex.value - 1)
  }

  return { slides, currentSlideIndex, currentSlide, isFirst, isLast, goTo, next, prev }
}
