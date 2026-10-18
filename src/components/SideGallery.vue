<script setup>
import { computed } from 'vue'
import MemoryPolaroids from '@/components/MemoryPolaroids.vue'
import SideBranches from '@/components/SideBranches.vue'

// Hai cột polaroid ở hai bên màn, có cành hoa lá bao quanh; nội dung chính của màn nằm giữa.
const props = defineProps({
  photos: { type: Array, required: true },
  caption: { type: String, default: '' },
  interval: { type: Number, default: 4000 },
})

// Mỗi bên một nửa bộ ảnh để hai cột không bao giờ hiện trùng ảnh
const sides = computed(() =>
  ['left', 'right'].map((name, index) => ({
    name,
    photos: props.photos.filter((_, i) => i % 2 === index),
    startDelay: (props.interval / 2) * index,
  })),
)
</script>

<template>
  <!-- Bên phải không có cành rủ để không che logo/tên công ty ở góc trên phải -->
  <SideBranches inner :hang-sides="['left']" />

  <div class="side-gallery" aria-hidden="true">
    <div v-for="side in sides" :key="side.name" class="side-gallery__side" :class="`side-gallery__side--${side.name}`">
      <MemoryPolaroids
        v-if="side.photos.length"
        class="side-gallery__photos"
        direction="column"
        :slot-count="2"
        :photo-width="280"
        :photos="side.photos"
        :caption="caption"
        :interval="interval"
        :start-delay="side.startDelay"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
// Lớp phủ toàn khung nội dung (SlideFrame__content là position: relative)
.side-gallery {
  position: absolute;
  inset: 0;
  pointer-events: none;

  &__side {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 480px;

    &--left {
      left: 0;
    }

    &--right {
      right: 0;
    }
  }

  &__photos {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
