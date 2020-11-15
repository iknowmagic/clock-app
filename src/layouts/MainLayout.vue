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
        <table>
          <tr>
            <th>Current timezone</th>
            <td>Europe/London</td>
          </tr>
          <tr>
            <th>Day of the year</th>
            <td>295</td>
          </tr>
          <tr>
            <th>Day of the week</th>
            <td>5</td>
          </tr>
          <tr>
            <th>Week number</th>
            <td>42</td>
          </tr>
        </table>
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
