<template>
  <div class="ornament" aria-hidden="true">
    <span class="ornament__line" />
    <svg class="ornament__flower" viewBox="-20 -20 40 40" width="36" height="36">
      <g fill="#D8B778">
        <ellipse v-for="angle in [0, 72, 144, 216, 288]" :key="angle" rx="6" ry="11" cy="-9" :transform="`rotate(${angle})`" />
      </g>
      <circle r="5" fill="#9B435A" />
    </svg>
    <span class="ornament__line" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/tokens' as *;

.ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  &__line {
    width: 160px;
    height: 2px;
    background: linear-gradient(90deg, transparent, $color-champagne);

    &:last-child {
      background: linear-gradient(90deg, $color-champagne, transparent);
    }
  }
}
</style>
