<script setup>
import BloomFlower from '@/components/BloomFlower.vue'
import FallingPetals from '@/components/FallingPetals.vue'
import { event } from '@/data/event'

// Khung chung cho mọi màn: nền, hoa trang trí, cánh hoa rơi, logo/tên công ty
defineProps({
  // 'full': hoa ở 4 góc · 'soft': hoa ở 2 góc · 'none': chỉ nền
  decor: { type: String, default: 'full' },
  petals: { type: Boolean, default: false },
  // Hoa đứng yên (màn cần ổn định để chụp ảnh)
  still: { type: Boolean, default: false },
  showBrand: { type: Boolean, default: true },
})
</script>

<template>
  <section class="slide-frame" :class="[`slide-frame--${decor}`, { 'slide-frame--still': still }]">
    <div class="slide-frame__glow slide-frame__glow--tl" />
    <div class="slide-frame__glow slide-frame__glow--br" />

    <template v-if="decor !== 'none'">
      <BloomFlower class="slide-frame__flower slide-frame__flower--tl" :size="340" />
      <BloomFlower class="slide-frame__flower slide-frame__flower--br" :size="300" color="#F48FA6" inner-color="#F4C7CF" />
      <template v-if="decor === 'full'">
        <BloomFlower class="slide-frame__flower slide-frame__flower--tr" :size="180" :petals="6" color="#F4C7CF" inner-color="#FDE8EC" />
        <BloomFlower class="slide-frame__flower slide-frame__flower--bl" :size="200" :petals="6" color="#F4C7CF" inner-color="#FDE8EC" />
      </template>
    </template>

    <FallingPetals v-if="petals" />

    <header v-if="showBrand" class="slide-frame__brand">
      <img class="slide-frame__logo" :src="event.logo" alt="Logo công ty" />
      <span class="slide-frame__company">{{ event.brandLabel }}</span>
    </header>

    <div class="slide-frame__content">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/tokens' as *;

.slide-frame {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: $color-cream;

  &__glow {
    position: absolute;
    width: 900px;
    height: 900px;
    border-radius: 50%;
    pointer-events: none;

    &--tl {
      top: -420px;
      left: -380px;
      background: radial-gradient(circle, rgba($color-blush, 0.85), transparent 65%);
    }

    &--br {
      right: -400px;
      bottom: -440px;
      background: radial-gradient(circle, rgba($color-blush, 0.75), transparent 65%);
    }
  }

  &__flower {
    position: absolute;
    pointer-events: none;
    filter: drop-shadow(0 12px 24px rgba($color-rose, 0.18));
    animation: float-soft 9s ease-in-out infinite;

    &--tl {
      top: -110px;
      left: -100px;
    }

    &--br {
      right: -80px;
      bottom: -90px;
      animation-delay: -4s;
    }

    &--tr {
      top: 60px;
      right: 120px;
      opacity: 0.75;
      animation-delay: -2s;
    }

    &--bl {
      bottom: 70px;
      left: 140px;
      opacity: 0.75;
      animation-delay: -6s;
    }
  }

  &--still &__flower {
    animation: none;
  }

  &__brand {
    position: absolute;
    top: 48px;
    right: 64px;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__logo {
    height: 64px;
  }

  &__company {
    font-size: $text-small;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: $color-rose;
  }

  // Khi có hoa ở góc trên phải, đẩy logo xuống để không chồng lên hoa
  &--full &__brand {
    top: auto;
    right: auto;
    bottom: 48px;
    left: 50%;
    transform: translateX(-50%);
  }

  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 120px 240px;
    text-align: center;
  }
}
</style>
