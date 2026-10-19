<script setup>
import { computed, onBeforeUnmount } from 'vue'
import AnswerTiles from '@/components/AnswerTiles.vue'
import QuizIntro from '@/components/QuizIntro.vue'
import SideBranches from '@/components/SideBranches.vue'
import SlideFrame from '@/components/SlideFrame.vue'
import { useQuizGame } from '@/composables/useQuizGame'
import { event } from '@/data/event'
import { assetUrl } from '@/utils/assetUrl'

// Câu hiện tại do App.vue điều khiển bằng phím ←/→ (xem useQuizGame)
const { question, isIntro, questionIndex, total, isAnswerVisible, isHintVisible, hideAnswer } = useQuizGame()

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
    <Transition name="question" mode="out-in">
      <QuizIntro v-if="isIntro" :total="total" />

      <!-- Khi hiện gợi ý, cả khối hình + ô chữ nhích lên để chừa chỗ cho khung gợi ý ở đáy -->
      <div v-else class="quiz__main" :class="{ 'quiz__main--lifted': isHintVisible && question.hint }">
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
            <AnswerTiles
              :answer="question.answer"
              :revealed="isAnswerVisible"
              :hint-visible="isHintVisible"
              :tile-size="isLongAnswer ? 84 : 112"
            />
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Gợi ý (phím G): nằm sát đáy màn để không đẩy lệch khung hình và dãy ô chữ -->
    <Transition name="hint">
      <p v-if="!isIntro && isHintVisible && question.hint" :key="question.id" class="quiz__clue">
        <span class="quiz__clue-label">Gợi ý</span>
        {{ question.hint }}
      </p>
    </Transition>
  </SlideFrame>
</template>

<style scoped lang="scss">
@use '@/assets/styles/tokens' as *;

.quiz {
  &__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform $duration-base $ease-out;

    &--lifted {
      transform: translateY(-48px);
    }
  }

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

  &__clue {
    position: absolute;
    bottom: 20px;
    left: 50%;
    width: max-content;
    max-width: 1500px;
    padding: 14px 32px;
    border: 2px solid rgba($color-champagne, 0.7);
    border-radius: $radius-md;
    background: rgba($color-surface, 0.95);
    box-shadow: $shadow-soft;
    font-size: 28px;
    line-height: 1.35;
    text-align: left;
    // Ghi đè text-wrap: balance (base) để chữ dàn kín chiều rộng khung, không để trống bên phải
    text-wrap: wrap;
    color: $color-ink;
    transform: translateX(-50%);
  }

  &__clue-label {
    display: inline-block;
    margin-right: 16px;
    padding: 2px 16px;
    border-radius: 999px;
    background: $color-rose;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $color-surface;
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

// Gợi ý trượt lên từ đáy
.hint-enter-active,
.hint-leave-active {
  transition:
    opacity $duration-base $ease-out,
    transform $duration-base $ease-out;
}

.hint-enter-from,
.hint-leave-to {
  opacity: 0;
  transform: translate(-50%, 24px);
}
</style>
