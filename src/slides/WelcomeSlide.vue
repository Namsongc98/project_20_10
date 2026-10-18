<script setup>
import OrnamentDivider from '@/components/OrnamentDivider.vue'
import SideBranches from '@/components/SideBranches.vue'
import SlideFrame from '@/components/SlideFrame.vue'
import { event } from '@/data/event'
</script>

<template>
  <SlideFrame decor="soft" petals :show-brand="false">
    <SideBranches :hang-sides="['left', 'right']" />
    <div class="welcome">
      <div class="welcome__brand anim-fade-up">
        <img class="welcome__logo" :src="event.logo" alt="Logo công ty" />
        <span class="welcome__company">{{ event.brandLabel }}</span>
      </div>

      <p class="welcome__concept anim-fade-up">{{ event.concept }}</p>
      <h1 class="welcome__title anim-fade-up">{{ event.welcome.title }}</h1>
      <OrnamentDivider class="welcome__ornament anim-fade-up" />
      <p class="welcome__message anim-fade-up">{{ event.welcome.message }}</p>
      <p class="welcome__date anim-fade-up">20 · 10 · {{ event.year }}</p>
    </div>
  </SlideFrame>
</template>

<style scoped lang="scss">
@use '@/assets/styles/tokens' as *;

.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  &__logo {
    height: 120px;
  }

  &__company {
    font-size: $text-small;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: $color-rose;
  }

  &__concept {
    margin-top: 48px;
    font-family: $font-display;
    font-style: italic;
    font-size: 56px;
    color: $color-champagne;
    animation-delay: 150ms;
  }

  &__title {
    max-width: 1440px;
    margin-top: 16px;
    font-size: $text-hero;
    animation-delay: 300ms;
  }

  &__ornament {
    margin-top: 40px;
    animation-delay: 450ms;
  }

  &__message {
    max-width: 1200px;
    margin-top: 32px;
    font-size: $text-h3;
    animation-delay: 600ms;
  }

  &__date {
    margin-top: 40px;
    padding: 10px 36px;
    border: 2px solid $color-champagne;
    border-radius: 999px;
    font-size: $text-small;
    font-weight: 600;
    letter-spacing: 0.2em;
    color: $color-rose;
    background: rgba($color-surface, 0.7);
    animation-delay: 750ms;
  }
}
</style>
