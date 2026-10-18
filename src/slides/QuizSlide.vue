<script setup>
import { computed, onBeforeUnmount } from 'vue'
import AnswerTiles from '@/components/AnswerTiles.vue'
import SideBranches from '@/components/SideBranches.vue'
import SlideFrame from '@/components/SlideFrame.vue'
import { useQuizGame } from '@/composables/useQuizGame'
import { event } from '@/data/event'
import { assetUrl } from '@/utils/assetUrl'

// Câu hiện tại do App.vue điều khiển bằng phím ←/→ (xem useQuizGame)
const { question, questionIndex, total, isAnswerVisible, hideAnswer } = useQuizGame()

const letterCount = computed(() => Array.from(question.value.answer.normalize('NFC').replace(/\s+/g, '')).length)
// Đáp án dài (thành ngữ): thu nhỏ khung hình và ô chữ để dãy ô 2 dòng vẫn vừa màn
const isLongAnswer = computed(() => letterCount.value > 10)
const counter = computed(
  () => `Câu ${String(questionIndex.value + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`,
)

onBeforeUnmount(hideAnswer)
</script>

<template>
  <SlideFrame decor="soft">
    <SideBranches />
    <p class="quiz__counter">{{ counter }}</p>

    <figure class="quiz__media" :class="{ 'quiz__media--compact': isLongAnswer }">
      <Transition name="question" mode="out-in">
        <video
          v-if="question.media.type === 'video'"
          :key="`v${question.id}`"
          :src="assetUrl(question.media.src)"
          autoplay
          muted
          loop
          playsinline
        />
        <img v-else :key="`i${question.id}`" :src="assetUrl(question.media.src)" :alt="question.media.alt" />
      </Transition>
      <figcaption class="quiz__hint">{{ event.quiz.hintLabel }}</figcaption>
    </figure>

    <Transition name="question" mode="out-in">
      <div :key="question.id" class="quiz__answer">
        <p class="quiz__label">Đáp án cần tìm ({{ letterCount }} chữ cái)</p>
        <AnswerTiles :answer="question.answer" :revealed="isAnswerVisible" :tile-size="isLongAnswer ? 84 : 112" />
      </div>
    </Transition>
  </SlideFrame>
</template>

<style scoped lang="scss">
@use '@/assets/styles/tokens' as *;

.quiz {
  &__counter {
    font-size: $text-small;
    font-weight: 600;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: $color-rose;
  }

  &__media {
    position: relative;
    width: 960px;
    height: 540px;
    margin: 24px 0 0;
    overflow: hidden;
    border: 6px solid $color-surface;
    border-radius: $radius-md;
    background: $color-blush-soft;
    box-shadow: $shadow-soft;
    transition:
      width $duration-base $ease-out,
      height $duration-base $ease-out;

    &--compact {
      width: 800px;
      height: 450px;
    }

    img,
    video {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__hint {
    position: absolute;
    right: 20px;
    bottom: 20px;
    padding: 8px 20px;
    border-radius: 999px;
    background: rgba($color-surface, 0.9);
    font-size: 24px;
    font-weight: 600;
    color: $color-rose;
  }

  &__label {
    margin: 32px 0 20px;
    font-size: $text-small;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $color-ink;
  }
}

// Đổi câu: mờ ra rồi hiện câu mới
.question-enter-active,
.question-leave-active {
  transition:
    opacity 250ms ease,
    transform 250ms $ease-out;
}

.question-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.question-leave-to {
  opacity: 0;
}
</style>
