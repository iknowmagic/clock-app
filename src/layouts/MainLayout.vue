<template>
  <div :class="['main', 'home', { 'main-open': showFooter }]">
    <transition mode="out-in" name="fade-in">
      <div v-if="!showFooter" class="main-header">
        <div class="quote">
          <div class="quote-text">
            “The science of operations, as derived from mathematics more
            especially, is a science of itself, and has its own abstract truth
            and value.”
          </div>
          <div class="quote-author">Ada Lovelace</div>
        </div>
        <div class="quote-refresh">
          <img src="@/assets/images/desktop/icon-refresh.svg" alt="refresh" />
        </div>
      </div>
    </transition>
    <div class="main-body">
      <div class="greeting">
        <div class="greeting-icon">
          <img src="@/assets/images/desktop/icon-sun.svg" alt="refresh" />
        </div>
        <div class="greeting-text">Good Morning</div>
      </div>
      <div class="time">
        <div class="time-display">11:37</div>
        <div class="time-zone">BST</div>
      </div>
      <div class="location">In London, UK</div>
      <v-button />
    </div>
    <transition mode="out-in" name="fade-in">
      <div v-if="showFooter" class="main-footer">
        <div class="footer-line current-timezone">
          <div class="footer-title">Current timezone</div>
          <div class="footer-value">Europe/London</div>
        </div>
        <div class="footer-line day-of-the-year">
          <div class="footer-title">Day of the year</div>
          <div class="footer-value">295</div>
        </div>
        <div class="footer-line day-of-the-week">
          <div class="footer-title">Day of the week</div>
          <div class="footer-value">5</div>
        </div>
        <div class="footer-line week-number">
          <div class="footer-title">Week number</div>
          <div class="footer-value">42</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// @flow

import { get } from 'vuex-pathify'

import vButton from '@/components/vButton'

export default {
  name: 'MainLayout',
  components: {
    vButton
  },
  computed: {
    showFooter: get('app/showFooter')
  }
}
</script>
