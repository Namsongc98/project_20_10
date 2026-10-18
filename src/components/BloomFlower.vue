<script setup>
import { computed } from 'vue'

// Bông hoa SVG cách điệu: lớp cánh ngoài + lớp cánh trong + nhụy
const props = defineProps({
  size: { type: Number, default: 240 },
  petals: { type: Number, default: 8 },
  color: { type: String, default: '#E8577A' },
  innerColor: { type: String, default: '#F48FA6' },
  centerColor: { type: String, default: '#F6E3B4' },
})

const outerAngles = computed(() => Array.from({ length: props.petals }, (_, i) => (360 / props.petals) * i))
const innerAngles = computed(() => outerAngles.value.map((angle) => angle + 180 / props.petals))
</script>

<template>
  <svg class="bloom-flower" :width="size" :height="size" viewBox="-100 -100 200 200" aria-hidden="true">
    <g :fill="color">
      <ellipse v-for="angle in outerAngles" :key="`o${angle}`" rx="26" ry="46" cy="-50" :transform="`rotate(${angle})`" />
    </g>
    <g :fill="innerColor">
      <ellipse v-for="angle in innerAngles" :key="`i${angle}`" rx="18" ry="32" cy="-34" :transform="`rotate(${angle})`" />
    </g>
    <circle r="26" :fill="centerColor" />
    <circle r="26" fill="none" stroke="#D8B778" stroke-width="3" stroke-dasharray="2 6" />
  </svg>
</template>
