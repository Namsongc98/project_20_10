<script setup>
import { nextTick, onMounted, ref } from 'vue'

// Dải chữ chạy ngang ở đáy màn: tên + lời chúc, lặp vô tận
const props = defineProps({
  items: { type: Array, required: true },
  label: { type: String, default: '' },
  // Tốc độ chạy (px stage mỗi giây)
  speed: { type: Number, default: 110 },
})

const track = ref(null)
const duration = ref('240s')

// Danh sách được render 2 lần liên tiếp; chạy hết đúng một bản rồi quay lại đầu thì không thấy chỗ nối
async function updateDuration() {
  await document.fonts?.ready
  await nextTick()
  if (!track.value) return
  duration.value = `${track.value.scrollWidth / 2 / props.speed}s`
}

onMounted(updateDuration)
</script>

<template>
  <div class="ticker" aria-hidden="true">
    <div v-if="label" class="ticker__label">{{ label }}</div>
    <div class="ticker__viewport">
      <div ref="track" class="ticker__track" :style="{ animationDuration: duration }">
        <template v-for="copy in 2" :key="copy">
          <span v-for="(item, i) in items" :key="`${copy}-${i}`" class="ticker__item">
            <span class="ticker__name">{{ item.name }}</span>
            <span class="ticker__wish">{{ item.wish }}</span>
            <span class="ticker__separator">✿</span>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/tokens' as *;

.ticker {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: stretch;
  height: 88px;
  background: rgba($color-surface, 0.88);
  border-top: 2px solid rgba($color-champagne, 0.6);
  box-shadow: 0 -12px 32px rgba($color-rose, 0.1);
  animation: fade-up $duration-slow $ease-out 600ms both;

  &__label {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    padding: 0 40px;
    background: $color-rose;
    font-size: $text-small;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: $color-surface;
    white-space: nowrap;
  }

  &__viewport {
    flex: 1;
    overflow: hidden;
    // Làm mờ hai đầu để chữ chạy vào/ra mềm mại
    mask-image: linear-gradient(to right, transparent, #000 80px, #000 calc(100% - 80px), transparent);
  }

  &__track {
    display: flex;
    width: max-content;
    height: 100%;
    animation: ticker-scroll linear infinite;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-left: 32px;
    font-size: 34px;
    white-space: nowrap;
  }

  &__name {
    font-family: $font-display;
    font-weight: 700;
    color: $color-rose;
  }

  &__wish {
    color: $color-ink;

    &::before {
      content: '—';
      margin-right: 16px;
      color: $color-champagne;
    }
  }

  &__separator {
    margin-left: 16px;
    color: $color-pink;
  }
}

@keyframes ticker-scroll {
  to {
    transform: translateX(-50%);
  }
}
</style>
