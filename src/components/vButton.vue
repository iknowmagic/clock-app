<template>
  <div
    :class="['btn-more', { 'btn-open': showFooter }]"
    @click="showFooter = true"
  >
    <div class="btn-text">more</div>
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
    showFooter: sync('app/showFooter')
  }
}
</script>
