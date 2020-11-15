<template>
  <div class="mobile-menu-container">
    <transition name="fade">
      <div
        v-if="openMenu"
        class="mobile-menu-backcloth"
        @click="openMenu = false"
      ></div>
    </transition>
    <transition name="mobile-menu-transition">
      <div v-if="openMenu" class="mobile-menu">
        <div class="mobile-menu-links">
          <router-link
            :to="{ name: 'Stories' }"
            @click.native="openMenu = false"
          >
            Stories
          </router-link>
          <router-link
            :to="{ name: 'Features' }"
            @click.native="openMenu = false"
          >
            Features
          </router-link>
          <router-link
            :to="{ name: 'Pricing' }"
            @click.native="openMenu = false"
          >
            Pricing
          </router-link>
        </div>
        <div class="line"></div>
        <button class="button-1 button-full">Get an Invite</button>
      </div>
    </transition>
  </div>
</template>

<script>
// @flow

import { sync } from 'vuex-pathify'

export default {
  name: 'MobileMenu',
  computed: {
    openMenu: sync('mobileMenu/openMenu')
  }
}
</script>
