<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const STAGE_WIDTH = 1920
const STAGE_HEIGHT = 1080

const scale = ref(1)
const stageWidth = ref(STAGE_WIDTH)
const stageHeight = ref(STAGE_HEIGHT)

// Scale theo khung 1920×1080 để nội dung giữ nguyên tỉ lệ, rồi giãn stage theo tỉ lệ màn hình thật
// để nền phủ kín toàn màn hình (không còn viền đen); nội dung vẫn nằm giữa.
function updateScale() {
  scale.value = Math.min(window.innerWidth / STAGE_WIDTH, window.innerHeight / STAGE_HEIGHT)
  stageWidth.value = window.innerWidth / scale.value
  stageHeight.value = window.innerHeight / scale.value
}

const stageStyle = computed(() => ({
  width: `${stageWidth.value}px`,
  height: `${stageHeight.value}px`,
  transform: `translate(-50%, -50%) scale(${scale.value})`,
}))

onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScale)
})
</script>

<template>
  <div class="viewport">
    <div class="stage" :style="stageStyle">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/tokens' as *;

.viewport {
  position: fixed;
  inset: 0;
  overflow: hidden;
  // Cùng màu nền slide để không lộ vệt khi làm tròn kích thước
  background: $color-cream;
}

.stage {
  position: absolute;
  top: 50%;
  left: 50%;
  overflow: hidden;
  transform-origin: center center;
  background: $color-cream;
}
</style>
