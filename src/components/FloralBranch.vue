<script setup>
import BloomFlower from '@/components/BloomFlower.vue'

// Cành hoa trang trí: thân cong + lá xen kẽ (tính tự động dọc thân) + nhánh phụ có hoa/nụ.
// Vẽ trong hệ toạ độ 260×900, gốc ở đáy; flip: lật ngang · hang: lộn ngược (rủ từ trên xuống).
const props = defineProps({
  height: { type: Number, default: 900 },
  flip: { type: Boolean, default: false },
  hang: { type: Boolean, default: false },
})

const VIEW_WIDTH = 260
const VIEW_HEIGHT = 900

// Thân chính gồm 2 đoạn Bézier bậc 3 nối nhau
const STEM = [
  [[130, 900], [90, 740], [190, 600], [140, 450]],
  [[140, 450], [100, 320], [80, 200], [150, 40]],
]

// Nhánh phụ: mọc từ điểm t trên đoạn seg, hướng (dx, dy), cuối nhánh là hoa hoặc nụ
const TWIGS = [
  { seg: 0, t: 0.45, dx: 90, dy: -110, end: 'flower', size: 58, petals: 6, color: '#F48FA6', inner: '#FDE8EC' },
  { seg: 0, t: 0.85, dx: -80, dy: -70, end: 'bud' },
  { seg: 1, t: 0.35, dx: 95, dy: -60, end: 'flower', size: 46, petals: 6, color: '#F4C7CF', inner: '#FDE8EC' },
  { seg: 1, t: 0.65, dx: -85, dy: -55, end: 'flower', size: 52, petals: 5, color: '#E8577A', inner: '#F48FA6' },
]

const LEAF_COLORS = ['#8DBF9A', '#6FA77F', '#A9CFB1']

function bezier([p0, p1, p2, p3], t) {
  const u = 1 - t
  const point = [0, 1].map(
    (i) => u * u * u * p0[i] + 3 * u * u * t * p1[i] + 3 * u * t * t * p2[i] + t * t * t * p3[i],
  )
  const tangent = [0, 1].map(
    (i) => 3 * u * u * (p1[i] - p0[i]) + 6 * u * t * (p2[i] - p1[i]) + 3 * t * t * (p3[i] - p2[i]),
  )
  return { point, angle: (Math.atan2(tangent[1], tangent[0]) * 180) / Math.PI }
}

const stemPath = STEM.map(
  ([p0, p1, p2, p3], i) => `${i === 0 ? `M${p0}` : ''} C${p1} ${p2} ${p3}`,
).join(' ')

// Lá xen kẽ hai bên thân, nhỏ dần về phía ngọn
const leaves = STEM.flatMap((segment, segIndex) =>
  [0.12, 0.3, 0.48, 0.66, 0.84].map((t, i) => {
    const { point, angle } = bezier(segment, t)
    const side = (segIndex * 5 + i) % 2 === 0 ? 1 : -1
    const progress = (segIndex + t) / STEM.length
    return {
      x: point[0],
      y: point[1],
      rotate: angle + side * 55,
      length: 78 - 36 * progress,
      color: LEAF_COLORS[(segIndex + i) % LEAF_COLORS.length],
    }
  }),
)

const twigs = TWIGS.map((twig) => {
  const { point } = bezier(STEM[twig.seg], twig.t)
  const end = [point[0] + twig.dx, point[1] + twig.dy]
  const control = [point[0] + twig.dx * 0.2, point[1] + twig.dy * 0.8]
  return { ...twig, path: `M${point} Q${control} ${end}`, end, kind: twig.end }
})

const top = STEM[STEM.length - 1][3]

function leafPath(length) {
  const w = length * 0.28
  return `M0 0 C${length * 0.3} ${-w} ${length * 0.75} ${-w} ${length} 0 C${length * 0.75} ${w} ${length * 0.3} ${w} 0 0Z`
}
</script>

<template>
  <svg
    class="floral-branch"
    :class="{ 'floral-branch--flip': flip, 'floral-branch--hang': hang }"
    :width="(height * VIEW_WIDTH) / VIEW_HEIGHT"
    :height="height"
    :viewBox="`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`"
    overflow="visible"
    aria-hidden="true"
  >
    <path :d="stemPath" fill="none" stroke="#6E9E78" stroke-width="7" stroke-linecap="round" />
    <path
      v-for="(twig, i) in twigs"
      :key="`t${i}`"
      :d="twig.path"
      fill="none"
      stroke="#6E9E78"
      stroke-width="4"
      stroke-linecap="round"
    />

    <g v-for="(leaf, i) in leaves" :key="`l${i}`" :transform="`translate(${leaf.x} ${leaf.y}) rotate(${leaf.rotate})`">
      <path :d="leafPath(leaf.length)" :fill="leaf.color" />
      <path :d="`M4 0 L${leaf.length * 0.85} 0`" stroke="#5B8A66" stroke-width="1.5" opacity="0.5" />
    </g>

    <template v-for="(twig, i) in twigs" :key="`e${i}`">
      <BloomFlower
        v-if="twig.kind === 'flower'"
        :x="twig.end[0] - twig.size / 2"
        :y="twig.end[1] - twig.size / 2"
        :size="twig.size"
        :petals="twig.petals"
        :color="twig.color"
        :inner-color="twig.inner"
      />
      <g v-else :transform="`translate(${twig.end}) rotate(-30)`">
        <ellipse rx="11" ry="17" fill="#F48FA6" />
        <path d="M-11 4 Q0 22 11 4 Q0 12 -11 4Z" fill="#7DB88A" />
      </g>
    </template>

    <BloomFlower :x="top[0] - 40" :y="top[1] - 40" :size="80" :petals="8" />
  </svg>
</template>

<style scoped lang="scss">
.floral-branch {
  display: block;
  overflow: visible;
  filter: drop-shadow(0 8px 16px rgba(155, 67, 90, 0.12));

  &--flip {
    transform: scaleX(-1);
  }

  &--hang {
    transform: rotate(180deg);
  }

  &--flip.floral-branch--hang {
    transform: rotate(180deg) scaleX(-1);
  }
}
</style>
