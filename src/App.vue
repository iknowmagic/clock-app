<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <router-view />
  </transition>
</template>

<script>
// @flow

import { sync } from 'vuex-pathify'

import MobileMenu from '@/components/MobileMenu'

export default {
  name: 'App',
  page() {
    // https://vue-meta.nuxtjs.org/guide/caveats.html#reactive-variables-in-template-functions
    const appName = this.appName
    return {
      title: '',
      titleTemplate: (titleChunk: string) => {
        return titleChunk
          ? `${titleChunk} ${appName ? ' | ' + appName : ''}`
          : appName
      }
    }
  },
  components: {},
  data() {
    return {
      appName: 'clock app'
    }
  },
  computed: {
    openMenu: sync('mobileMenu/openMenu')
  }
}
</script>
