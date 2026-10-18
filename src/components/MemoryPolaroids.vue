<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { assetUrl } from '@/utils/assetUrl'

const props = defineProps({
  photos: { type: Array, required: true },
  caption: { type: String, default: '' },
  slotCount: { type: Number, default: 4 },
  // 'row': xếp ngang · 'column': xếp dọc (dùng cho 2 bên màn)
  direction: { type: String, default: 'row' },
  // Chiều rộng ảnh (px stage); khung ảnh luôn 4:3
  photoWidth: { type: Number, default: 360 },
  // Mỗi lần chỉ đổi ảnh ở một khung, lần lượt theo thứ tự khung
  interval: { type: Number, default: 3500 },
  // Lệch thời điểm đổi ảnh giữa các nhóm polaroid trên cùng màn
  startDelay: { type: Number, default: 0 },
})

// Độ nghiêng/lệch của từng khung để trông như ảnh đặt tự nhiên trên bàn (lệch theo trục vuông góc hướng xếp)
const SLOT_POSES = [
  { rotate: -5, offset: 12 },
  { rotate: 3, offset: -16 },
  { rotate: -2, offset: 20 },
  { rotate: 5, offset: -8 },
  { rotate: -4, offset: 6 },
]

const count = Math.min(props.slotCount, props.photos.length)
const slots = ref(Array.from({ length: count }, (_, index) => index))
let nextPhoto = count
let nextSlot = 0
let delayTimer
let timer

function swapNext() {
  slots.value[nextSlot] = nextPhoto % props.photos.length
  nextPhoto += 1
  nextSlot = (nextSlot + 1) % count
}

function poseStyle(slot) {
  const pose = SLOT_POSES[slot % SLOT_POSES.length]
  const isRow = props.direction === 'row'
  return {
    '--rotate': `${pose.rotate}deg`,
    '--tx': isRow ? '0px' : `${pose.offset}px`,
    '--ty': isRow ? `${pose.offset}px` : '0px',
    animationDelay: `${300 + slot * 150}ms`,
  }
}

onMounted(() => {
  // Đủ ảnh để thay thì mới chạy vòng lặp
  if (props.photos.length <= count) return
  delayTimer = window.setTimeout(() => {
    timer = window.setInterval(swapNext, props.interval)
  }, props.startDelay)
})

onBeforeUnmount(() => {
  window.clearTimeout(delayTimer)
  window.clearInterval(timer)
})
</script>

<template>
  <div
    class="polaroids"
    :class="`polaroids--${direction}`"
    :style="{ '--photo-width': `${photoWidth}px` }"
  >
    <figure v-for="(photoIndex, slot) in slots" :key="slot" class="polaroids__card" :style="poseStyle(slot)">
      <div class="polaroids__photo">
        <Transition name="photo">
          <img
            :key="photoIndex"
            :src="assetUrl(photos[photoIndex].src)"
            :style="{ objectPosition: photos[photoIndex].focus ?? 'center' }"
            alt=""
          />
        </Transition>
      </div>
      <figcaption v-if="caption" class="polaroids__caption">{{ caption }}</figcaption>
    </figure>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/tokens' as *;

.polaroids {
  display: flex;
  justify-content: center;
  gap: 40px;

  &--column {
    flex-direction: column;
    align-items: center;
    gap: 48px;
  }

  &__card {
    margin: 0;
    padding: calc(var(--photo-width) * 0.045) calc(var(--photo-width) * 0.045) 0;
    background: $color-surface;
    border-radius: 6px;
    box-shadow: $shadow-soft;
    transform: translate(var(--tx), var(--ty)) rotate(var(--rotate));
    animation: polaroid-in $duration-slow $ease-out both;
  }

  &__photo {
    position: relative;
    width: var(--photo-width);
    height: calc(var(--photo-width) * 0.75);
    overflow: hidden;
    background: $color-blush-soft;

    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__caption {
    padding: calc(var(--photo-width) * 0.04) 0 calc(var(--photo-width) * 0.05);
    font-family: $font-display;
    font-size: calc(var(--photo-width) * 0.072);
    font-style: italic;
    color: $color-rose;
  }
}

@keyframes polaroid-in {
  from {
    opacity: 0;
    transform: translate(var(--tx), calc(var(--ty) + 60px)) rotate(0deg) scale(0.9);
  }
}

// Ảnh mới hiện chồng lên ảnh cũ: phóng nhẹ rồi rõ dần
.photo-enter-active {
  transition:
    opacity $duration-slow $ease-out,
    transform 1400ms $ease-out;
}

.photo-leave-active {
  transition: opacity $duration-slow ease;
}

.photo-enter-from {
  opacity: 0;
  transform: scale(1.12);
}

.photo-leave-to {
  opacity: 0;
}
</style>
