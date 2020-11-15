<template>
  <div
    :class="['btn-more', { 'btn-open': showFooter }]"
    @click="showFooter = !showFooter"
  >
    <div class="btn-text">
      <transition mode="out-in" name="fade-in">
        <div :key="text">{{ text }}</div>
      </transition>
    </div>
    <div class="btn-caret">
      <img src="@/assets/images/desktop/icon-arrow-up.svg" alt="caret" />
    </div>
  </div>
</template>

<script>
// @flow

import { sync } from 'vuex-pathify'

export default {
  name: 'VButton',
  computed: {
    showFooter: sync('app/showFooter'),
    text() {
      return !this.showFooter ? 'more' : 'less'
    }
  }
}
</script>
