<script setup>
import { computed } from 'vue'

// Cánh hoa rơi nhẹ — giới hạn số lượng để laptop yếu không bị giật
const props = defineProps({
  count: { type: Number, default: 14 },
})

const PETAL_COLORS = ['#F4C7CF', '#E8577A', '#F48FA6', '#D8B778']

// Giá trị giả ngẫu nhiên cố định theo chỉ số để mỗi lần render đều giống nhau
function seeded(i, salt) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

const petals = computed(() =>
  Array.from({ length: props.count }, (_, i) => ({
    left: `${seeded(i, 1) * 100}%`,
    size: 18 + seeded(i, 2) * 22,
    duration: `${14 + seeded(i, 3) * 12}s`,
    delay: `${-seeded(i, 4) * 26}s`,
    drift: `${(seeded(i, 5) - 0.5) * 320}px`,
    color: PETAL_COLORS[i % PETAL_COLORS.length],
    opacity: 0.45 + seeded(i, 6) * 0.4,
  })),
)
</script>

<template>
  <div class="falling-petals" aria-hidden="true">
    <span
      v-for="(petal, i) in petals"
      :key="i"
      class="falling-petals__petal"
      :style="{
        left: petal.left,
        width: `${petal.size}px`,
        height: `${petal.size * 0.7}px`,
        background: petal.color,
        opacity: petal.opacity,
        animationDuration: petal.duration,
        animationDelay: petal.delay,
        '--drift': petal.drift,
      }"
    />
  </div>
</template>

<style scoped lang="scss">
.falling-petals {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;

  &__petal {
    position: absolute;
    top: -60px;
    border-radius: 80% 0 80% 0;
    animation-name: petal-fall;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    will-change: transform;
  }
}

@keyframes petal-fall {
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  50% {
    transform: translate3d(calc(var(--drift) * 0.6), 580px, 0) rotate(200deg);
  }
  100% {
    transform: translate3d(var(--drift), 1180px, 0) rotate(400deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .falling-petals {
    display: none;
  }
}
</style>
