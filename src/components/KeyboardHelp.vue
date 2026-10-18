<script setup>
import { keyBindings } from '@/data/keyBindings'
</script>

<template>
  <div class="keyboard-help" role="dialog" aria-label="Phím tắt điều khiển">
    <div class="keyboard-help__panel">
      <h2 class="keyboard-help__title">Phím tắt điều khiển</h2>
      <dl class="keyboard-help__list">
        <div v-for="binding in keyBindings" :key="binding.action" class="keyboard-help__row">
          <dt class="keyboard-help__keys">
            <kbd v-for="key in binding.keys" :key="key">{{ key }}</kbd>
          </dt>
          <dd class="keyboard-help__action">{{ binding.action }}</dd>
        </div>
      </dl>
      <p class="keyboard-help__note">Nhấn H hoặc Esc để đóng</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/tokens' as *;

.keyboard-help {
  position: absolute;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  // Không dùng backdrop-filter: tốn GPU trên laptop yếu và có thể lỗi hiển thị
  background: rgba($color-ink, 0.72);

  &__panel {
    width: 1400px;
    padding: 64px 80px;
    border-radius: $radius-lg;
    background: $color-surface;
    box-shadow: $shadow-soft;
  }

  &__title {
    font-size: $text-h2;
    text-align: center;
  }

  &__list {
    margin-top: 40px;
  }

  &__row {
    display: grid;
    grid-template-columns: 340px 1fr;
    align-items: center;
    gap: 32px;
    padding: 18px 0;
    border-bottom: 1px solid rgba($color-blush, 0.8);

    &:last-child {
      border-bottom: 0;
    }
  }

  &__keys {
    display: flex;
    gap: 12px;
  }

  kbd {
    min-width: 64px;
    padding: 6px 18px;
    border: 2px solid $color-blush;
    border-radius: $radius-sm;
    background: $color-blush-soft;
    font-family: $font-body;
    font-size: $text-small;
    font-weight: 800;
    color: $color-rose;
    text-align: center;
  }

  &__action {
    font-size: $text-small;
  }

  &__note {
    margin-top: 32px;
    font-size: 24px;
    color: rgba($color-ink, 0.6);
    text-align: center;
  }
}
</style>
