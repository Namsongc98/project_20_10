<script setup>
import { ref, watch } from 'vue'
import KeyboardHelp from '@/components/KeyboardHelp.vue'
import ScaledStage from '@/components/ScaledStage.vue'
import { useIdleCursor } from '@/composables/useIdleCursor'
import { toggleFullscreen, useKeyboardControls } from '@/composables/useKeyboardControls'
import { usePresentation } from '@/composables/usePresentation'
import { useMusic } from '@/composables/useMusic'
import { useQuizGame } from '@/composables/useQuizGame'
import { useSoundEffects } from '@/composables/useSoundEffects'

const { slides, currentSlide, currentSlideIndex, goTo, next, prev } = usePresentation()
const { total, goToQuestion, goToIntro, nextQuestion, prevQuestion, toggleAnswer, toggleHint } = useQuizGame()
const { enterSlide, playSlideMusic, toggleMusic, playEffect } = useMusic()
const { isMuted, toggleMute } = useSoundEffects()
const isHelpOpen = ref(false)

useIdleCursor()

const isQuiz = () => currentSlide.value.id === 'quiz'

// Mỗi màn có nhạc nền riêng (data/music.js); đổi màn thì nhạc tự chuyển
watch(() => currentSlide.value.id, enterSlide, { immediate: true })

// Phím Q: hiện đáp án kèm tiếng ta-da; ẩn đáp án thì không phát
function handleToggleAnswer() {
  if (isQuiz() && toggleAnswer()) playEffect('taDa')
}

// Ở màn game: ←/→ chuyển giữa màn giới thiệu và các câu; câu cuối → sang Tea break, giới thiệu ← về Tặng hoa.
// Vào game bằng → thì bắt đầu từ màn giới thiệu; quay lại bằng ← từ Tea break thì vào câu cuối.
function handleNext() {
  if (isQuiz() && nextQuestion()) return
  if (slides[currentSlideIndex.value + 1]?.id === 'quiz') goToIntro()
  next()
}

function handlePrev() {
  if (isQuiz() && prevQuestion()) return
  if (slides[currentSlideIndex.value - 1]?.id === 'quiz') goToQuestion(total - 1)
  prev()
}

useKeyboardControls({
  next: handleNext,
  prev: handlePrev,
  goTo,
  toggleAnswer: handleToggleAnswer,
  toggleHint: () => isQuiz() && toggleHint(),
  toggleMusic,
  playSlideMusic,
  applause: () => playEffect('applause'),
  toggleFullscreen,
  toggleSound: toggleMute,
  toggleHelp: () => (isHelpOpen.value = !isHelpOpen.value),
  // Esc: trình duyệt tự thoát toàn màn hình; ở đây chỉ đóng bảng trợ giúp
  escape: () => (isHelpOpen.value = false),
})
</script>

<template>
  <ScaledStage>
    <Transition name="slide">
      <component :is="currentSlide.component" :key="currentSlide.id" />
    </Transition>

    <Transition name="help">
      <KeyboardHelp v-if="isHelpOpen" />
    </Transition>

    <Transition name="help">
      <div v-if="isMuted" class="sound-off">Đã tắt âm thanh · nhấn M để bật</div>
    </Transition>
  </ScaledStage>
</template>

<style lang="scss">
@use '@/assets/styles/tokens' as *;

// Chuyển cảnh giữa các màn: hai màn chồng lên nhau và cross-fade
.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 700ms $ease-out,
    transform 700ms $ease-out;
}

.slide-enter-from {
  opacity: 0;
  transform: scale(1.03);
}

.slide-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

// Nhãn trạng thái khi tắt âm thanh (phím M)
.sound-off {
  position: absolute;
  bottom: 32px;
  left: 32px;
  z-index: 20;
  padding: 10px 24px;
  border-radius: 999px;
  background: rgba($color-ink, 0.75);
  font-size: 22px;
  font-weight: 600;
  color: $color-surface;
}

.help-enter-active,
.help-leave-active {
  transition: opacity $duration-fast ease;
}

.help-enter-from,
.help-leave-to {
  opacity: 0;
}
</style>
