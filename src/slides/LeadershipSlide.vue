<script setup>
import { computed } from 'vue'
import OrnamentDivider from '@/components/OrnamentDivider.vue'
import SideGallery from '@/components/SideGallery.vue'
import SlideFrame from '@/components/SlideFrame.vue'
import StaffTicker from '@/components/StaffTicker.vue'
import { event } from '@/data/event'
import { memories } from '@/data/memories'
import { leadershipStaffWishes } from '@/data/staff'

// Tiêu đề dạng "Dòng chính — Dòng phụ" được tách thành 2 dòng
const titleParts = computed(() => event.leadership.title.split(/\s+—\s+/))
const hasSpeaker = computed(() => Boolean(event.leadership.speakerName))
</script>

<template>
  <SlideFrame decor="soft" still>
    <SideGallery :photos="memories" :caption="event.memoriesCaption" />
    <StaffTicker :items="leadershipStaffWishes" :label="event.tickerLabel" />

    <p class="kicker anim-fade-up">Lời chúc từ Ban lãnh đạo</p>
    <h1 class="leadership__title anim-fade-up">{{ titleParts[0] }}</h1>
    <p v-if="titleParts[1]" class="leadership__subtitle anim-fade-up">{{ titleParts[1] }}</p>
    <OrnamentDivider class="leadership__ornament anim-fade-up" />

    <div v-if="hasSpeaker" class="leadership__speaker anim-fade-up">
      <p class="leadership__speaker-name">{{ event.leadership.speakerName }}</p>
      <p v-if="event.leadership.speakerTitle" class="leadership__speaker-title">
        {{ event.leadership.speakerTitle }}
      </p>
    </div>
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

.leadership {
  &__title {
    max-width: 940px;
    margin-top: 32px;
    font-size: 96px;
    animation-delay: 150ms;
  }

  &__subtitle {
    margin-top: 16px;
    font-family: $font-display;
    font-style: italic;
    font-size: $text-h2;
    color: $color-champagne;
    animation-delay: 300ms;
  }

  &__ornament {
    margin-top: 48px;
    animation-delay: 450ms;
  }

  &__speaker {
    margin-top: 48px;
    padding: 28px 72px;
    border-radius: $radius-md;
    background: rgba($color-surface, 0.8);
    box-shadow: $shadow-soft;
    animation-delay: 600ms;
  }

  &__speaker-name {
    font-family: $font-display;
    font-size: $text-h3;
    font-weight: 700;
    color: $color-rose;
  }

  &__speaker-title {
    margin-top: 4px;
    font-size: $text-small;
  }
}
</style>
