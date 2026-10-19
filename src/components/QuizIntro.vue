<script setup>
import OrnamentDivider from '@/components/OrnamentDivider.vue'
import { event } from '@/data/event'

// Màn giới thiệu luật chơi, hiện trước câu 1 của mini game
defineProps({
  total: { type: Number, required: true },
})

const { title, intro } = event.quiz
</script>

<template>
  <div class="intro">
    <p class="intro__kicker anim-fade-up">Mini game</p>
    <h1 class="intro__title anim-fade-up">{{ title }}</h1>
    <p class="intro__tagline anim-fade-up">{{ total }} câu đố · Nhìn hình đoán chữ</p>
    <OrnamentDivider class="intro__ornament anim-fade-up" />

    <ol class="intro__rules">
      <li
        v-for="(rule, i) in intro.rules"
        :key="rule.title"
        class="intro__rule anim-fade-up"
        :style="{ animationDelay: `${450 + i * 120}ms` }"
      >
        <span class="intro__step">{{ i + 1 }}</span>
        <svg class="intro__icon" viewBox="0 0 64 64" aria-hidden="true">
          <template v-if="rule.icon === 'eye'">
            <path d="M4 32 C 16 14, 48 14, 60 32 C 48 50, 16 50, 4 32Z" fill="#FDE8EC" stroke="#E8577A" stroke-width="4" />
            <circle cx="32" cy="32" r="10" fill="#E8577A" />
            <circle cx="35" cy="29" r="3" fill="#FFFFFF" />
          </template>
          <template v-else-if="rule.icon === 'hand'">
            <path d="M22 58 L 18 36 C 17 31, 24 30, 25 35 L 26 40 L 26 12 C 26 7, 33 7, 33 12 L 33 30 L 33 8 C 33 3, 40 3, 40 8 L 40 30 L 41 12 C 41 7, 48 7, 48 12 L 47 36 C 47 48, 42 54, 40 58Z" fill="#F5CBA7" stroke="#D99E78" stroke-width="3" stroke-linejoin="round" />
            <path d="M8 14 l 6 4 M6 26 l 7 1 M54 6 l -2 6" stroke="#E8577A" stroke-width="4" stroke-linecap="round" />
          </template>
          <template v-else-if="rule.icon === 'gift'">
            <rect x="8" y="26" width="48" height="32" rx="4" fill="#E8577A" />
            <rect x="4" y="18" width="56" height="12" rx="3" fill="#F48FA6" />
            <rect x="28" y="18" width="8" height="40" fill="#F2C14E" />
            <path d="M32 18 C 22 4, 10 12, 20 18Z M32 18 C 42 4, 54 12, 44 18Z" fill="#F2C14E" />
          </template>
          <template v-else>
            <path d="M32 6 C 18 6, 12 18, 16 28 C 19 35, 24 37, 24 44 L 40 44 C 40 37, 45 35, 48 28 C 52 18, 46 6, 32 6Z" fill="#FFE58A" stroke="#E8B93A" stroke-width="3" />
            <rect x="24" y="46" width="16" height="6" rx="2" fill="#A9A9B3" />
            <rect x="26" y="54" width="12" height="5" rx="2" fill="#8C8C99" />
            <path d="M6 20 l 5 2 M58 20 l -5 2 M32 0 l 0 3" stroke="#F2C14E" stroke-width="3" stroke-linecap="round" />
          </template>
        </svg>
        <h2 class="intro__rule-title">{{ rule.title }}</h2>
        <p class="intro__rule-text">{{ rule.text }}</p>
      </li>
    </ol>

    <div class="intro__topics anim-fade-up">
      <span class="intro__topics-label">Chủ đề</span>
      <span v-for="topic in intro.topics" :key="topic" class="intro__topic">{{ topic }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/tokens' as *;

.intro {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__kicker {
    font-size: $text-small;
    font-weight: 600;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: $color-rose;
  }

  &__title {
    margin-top: 12px;
    font-size: 120px;
    font-style: italic;
    animation-delay: 100ms;
  }

  &__tagline {
    margin-top: 8px;
    font-family: $font-display;
    font-size: $text-h3;
    color: $color-champagne;
    animation-delay: 200ms;
  }

  &__ornament {
    margin-top: 24px;
    animation-delay: 300ms;
  }

  &__rules {
    display: grid;
    grid-template-columns: repeat(4, 300px);
    gap: 32px;
    margin: 40px 0 0;
    padding: 0;
    list-style: none;
  }

  &__rule {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 36px 24px 32px;
    border-radius: $radius-md;
    background: rgba($color-surface, 0.85);
    box-shadow: $shadow-soft;
  }

  &__step {
    position: absolute;
    top: -20px;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: $color-rose;
    font-size: 24px;
    font-weight: 700;
    color: $color-surface;
    transform: translateX(-50%);
  }

  &__icon {
    width: 88px;
    height: 88px;
  }

  &__rule-title {
    margin-top: 16px;
    font-size: 34px;
    color: $color-rose;
  }

  &__rule-text {
    margin-top: 10px;
    font-size: 24px;
    line-height: 1.4;
    color: $color-ink;
  }

  &__topics {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    animation-delay: 950ms;
  }

  &__topics-label {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: $color-rose;
  }

  &__topic {
    padding: 10px 28px;
    border: 2px solid rgba($color-champagne, 0.8);
    border-radius: 999px;
    background: rgba($color-surface, 0.8);
    font-size: 26px;
    font-weight: 600;
    color: $color-ink;
  }
}
</style>
