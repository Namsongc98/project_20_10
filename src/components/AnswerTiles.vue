<script setup>
import { computed, onBeforeUnmount, watch } from 'vue'
import { useSoundEffects } from '@/composables/useSoundEffects'

const props = defineProps({
  answer: { type: String, required: true },
  revealed: { type: Boolean, default: false },
  // Hiện gợi ý (phím G): lật chữ cái đầu của mỗi từ
  hintVisible: { type: Boolean, default: false },
  // Cạnh ô chữ (px stage); chữ cái và khoảng cách co giãn theo
  tileSize: { type: Number, default: 112 },
})

// Chuẩn hóa NFC + viết hoa, tách ký tự bằng Array.from để giữ nguyên chữ có dấu
const words = computed(() => {
  let index = 0
  return props.answer
    .normalize('NFC')
    .toLocaleUpperCase('vi')
    .trim()
    .split(/\s+/)
    .map((word) => Array.from(word).map((char) => ({ char, order: index++ })))
})

// Lật lần lượt từng ô, mỗi ô cách nhau tối đa 120ms và cả dãy không quá ~1,8 giây
const letterCount = computed(() => words.value.flat().length)
const revealStep = computed(() => Math.min(120, 1800 / Math.max(letterCount.value, 1)))

// Ô gợi ý = chữ cái đầu mỗi từ; map order → vị trí trong lượt gợi ý để các ô gợi ý lật nối tiếp nhau
const hintOrders = computed(() => new Map(words.value.map((word, i) => [word[0].order, i])))

function isHinted(tile) {
  return props.hintVisible && hintOrders.value.has(tile.order)
}

function isShown(tile) {
  return props.revealed || isHinted(tile)
}

// Lật đáp án: theo thứ tự cả dãy · lật gợi ý: chỉ các ô gợi ý, nối tiếp nhau
function revealDelay(tile) {
  const step = props.revealed ? tile.order : (hintOrders.value.get(tile.order) ?? 0)
  return `${step * revealStep.value}ms`
}

// Âm thanh lật ô đi cùng animation: hiện đáp án/gợi ý thì phát, ẩn hoặc đổi câu thì dừng
const { playReveal, stopReveal } = useSoundEffects()
watch(
  () => props.revealed,
  (revealed) => (revealed ? playReveal(letterCount.value, revealStep.value) : stopReveal()),
)
watch(
  () => props.hintVisible,
  (visible) => {
    if (props.revealed) return
    if (visible) playReveal(hintOrders.value.size, revealStep.value)
    else stopReveal()
  },
)
onBeforeUnmount(stopReveal)
</script>

<template>
  <div class="tiles" :style="{ '--tile-size': `${tileSize}px` }">
    <div v-for="(word, wordIndex) in words" :key="wordIndex" class="tiles__word">
      <span
        v-for="tile in word"
        :key="tile.order"
        class="tiles__tile"
        :class="{ 'tiles__tile--revealed': revealed, 'tiles__tile--hinted': !revealed && isHinted(tile) }"
      >
        <!-- Ô chưa được lật thì không render chữ vào DOM -->
        <span v-if="isShown(tile)" class="tiles__char" :style="{ animationDelay: revealDelay(tile) }">
          {{ tile.char }}
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/tokens' as *;

.tiles {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: calc(var(--tile-size) * 0.2) calc(var(--tile-size) * 0.5);
  perspective: 800px;

  &__word {
    display: flex;
    gap: calc(var(--tile-size) * 0.14);
  }

  &__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--tile-size);
    height: var(--tile-size);
    border: 4px solid $color-blush;
    border-radius: $radius-sm;
    background: rgba($color-surface, 0.7);
    transition: border-color $duration-base $ease-out;

    &--revealed {
      border-color: $color-pink;
    }

    // Ô lật nhờ gợi ý: viền vàng để phân biệt với lúc hiện cả đáp án
    &--hinted {
      border-color: $color-champagne;
      background: rgba($color-champagne, 0.12);
    }
  }

  &__char {
    font-family: $font-display;
    font-size: calc(var(--tile-size) * 0.64);
    font-weight: 700;
    line-height: 1;
    color: $color-rose;
    animation: tile-flip-in 600ms $ease-out both;
  }
}
</style>
