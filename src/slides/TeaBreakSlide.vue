<script setup>
import MemoryPolaroids from '@/components/MemoryPolaroids.vue'
import OrnamentDivider from '@/components/OrnamentDivider.vue'
import SideBranches from '@/components/SideBranches.vue'
import SlideFrame from '@/components/SlideFrame.vue'
import { event } from '@/data/event'
import { memories } from '@/data/memories'
</script>

<template>
  <SlideFrame decor="soft" petals>
    <SideBranches />
    <h1 class="tea__title anim-fade-up">{{ event.teaBreak.title }}</h1>
    <OrnamentDivider class="tea__ornament anim-fade-up" />
    <p class="tea__message anim-fade-up">{{ event.teaBreak.message }}</p>
    <MemoryPolaroids
      v-if="memories.length"
      class="tea__memories"
      :photos="memories"
      :caption="event.memoriesCaption"
    />
  </SlideFrame>
</template>

<style scoped lang="scss">
@use '@/assets/styles/tokens' as *;

.tea {
  &__title {
    font-size: 104px;
    font-style: italic;
    white-space: nowrap;
  }

  &__ornament {
    margin-top: 28px;
    animation-delay: 150ms;
  }

  &__message {
    max-width: 1300px;
    margin-top: 24px;
    font-family: $font-display;
    font-size: $text-h3;
    font-weight: 600;
    color: $color-ink;
    animation-delay: 300ms;
  }

  &__memories {
    margin-top: 64px;
  }
}
</style>
