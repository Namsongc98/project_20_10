<script setup>
import OrnamentDivider from '@/components/OrnamentDivider.vue'
import SideBranches from '@/components/SideBranches.vue'
import SlideFrame from '@/components/SlideFrame.vue'
import { event } from '@/data/event'
</script>

<template>
  <SlideFrame decor="soft">
    <SideBranches />
    <p class="kicker anim-fade-up">Khai mạc chương trình</p>
    <h1 class="opening__title anim-fade-up">{{ event.opening.title }}</h1>
    <OrnamentDivider class="opening__ornament anim-fade-up" />
    <p class="opening__message anim-fade-up">{{ event.opening.message }}</p>
  </SlideFrame>
</template>

<style scoped lang="scss">
@use '@/assets/styles/tokens' as *;

.kicker {
  font-size: $text-small;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: $color-rose;
}

.opening {
  &__title {
    margin-top: 24px;
    font-size: 144px;
    font-style: italic;
    animation-delay: 150ms;
  }

  &__ornament {
    margin-top: 40px;
    animation-delay: 300ms;
  }

  &__message {
    max-width: 1200px;
    margin-top: 40px;
    font-size: $text-h3;
    animation-delay: 450ms;
  }
}
</style>
