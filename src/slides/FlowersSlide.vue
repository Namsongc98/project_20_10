<script setup>
import BloomFlower from '@/components/BloomFlower.vue'
import SideGallery from '@/components/SideGallery.vue'
import SlideFrame from '@/components/SlideFrame.vue'
import StaffTicker from '@/components/StaffTicker.vue'
import { event } from '@/data/event'
import { memories } from '@/data/memories'
import { flowersStaffWishes } from '@/data/staff'
</script>

<template>
  <!-- Màn ổn định để chụp ảnh: hoa đứng yên, không cánh hoa rơi; cành hoa + ảnh kỷ niệm ở 2 bên -->
  <SlideFrame decor="soft" still>
    <SideGallery :photos="memories" :caption="event.memoriesCaption" />
    <StaffTicker :items="flowersStaffWishes" :label="event.tickerLabel" />

    <div class="flowers__bouquet anim-fade-up" aria-hidden="true">
      <BloomFlower :size="120" :petals="6" color="#F4C7CF" inner-color="#FDE8EC" />
      <BloomFlower :size="170" />
      <BloomFlower :size="120" :petals="6" color="#F48FA6" inner-color="#F4C7CF" />
    </div>
    <h1 class="flowers__title anim-fade-up">{{ event.flowers.title }}</h1>
    <p class="flowers__message anim-fade-up">{{ event.flowers.message }}</p>
  </SlideFrame>
</template>

<style scoped lang="scss">
@use '@/assets/styles/tokens' as *;

.flowers {
  &__bouquet {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    margin-bottom: 24px;
  }

  &__title {
    max-width: 940px;
    font-size: 128px;
    font-style: italic;
    animation-delay: 150ms;
  }

  &__message {
    max-width: 860px;
    margin-top: 40px;
    font-size: $text-h3;
    animation-delay: 300ms;
  }
}
</style>
