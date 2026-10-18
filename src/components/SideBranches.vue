<script setup>
import { computed } from 'vue'
import FloralBranch from '@/components/FloralBranch.vue'

// Cành hoa lá ở hai bên màn. Cành giữ nguyên cỡ và đặt lấn ra ngoài khung để hoa/lá không bị thu nhỏ —
// trông như cành mọc vào từ mép màn. Toạ độ `edge` tính từ mép ngoài của mỗi bên; bên phải là bản đối xứng.
const props = defineProps({
  // Thêm cành ở phía trong (dùng khi hai bên có cột ảnh, nội dung giữa hẹp)
  inner: { type: Boolean, default: false },
  // Bên có cành rủ từ trên xuống; bỏ bên phải khi logo/tên công ty nằm góc trên phải
  hangSides: { type: Array, default: () => ['left'] },
})

function branchesFor(side) {
  const branches = [
    { height: 900, edge: -70, bottom: -40 },
    { height: 620, edge: 40, bottom: -150, flip: true },
  ]
  if (props.inner) branches.push({ height: 700, edge: 330, bottom: -400, flip: true })
  if (props.hangSides.includes(side)) {
    branches.push({ height: 700, edge: props.inner ? 320 : 170, top: -440, hang: true })
  }

  // Bên phải lật ngược hướng nghiêng để đối xứng với bên trái
  return branches.map(({ edge, top, bottom, flip = false, ...branch }) => ({
    ...branch,
    flip: side === 'right' ? !flip : flip,
    style: {
      [side]: `${edge}px`,
      ...(top !== undefined ? { top: `${top}px` } : { bottom: `${bottom}px` }),
    },
  }))
}

const sides = computed(() => ['left', 'right'].map((name) => ({ name, branches: branchesFor(name) })))
</script>

<template>
  <div class="side-branches" aria-hidden="true">
    <template v-for="side in sides" :key="side.name">
      <FloralBranch
        v-for="(branch, i) in side.branches"
        :key="`${side.name}-${i}`"
        class="side-branches__branch"
        :style="branch.style"
        :height="branch.height"
        :flip="branch.flip"
        :hang="branch.hang"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
// Lớp phủ toàn khung nội dung, nằm dưới chữ (SlideFrame__content là position: relative + z-index)
.side-branches {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;

  &__branch {
    position: absolute;
  }
}
</style>
