<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
    appear
  >
    <div v-if="visible" class="scroll-top" @click="scrollTop">
      <slot />
    </div>
  </transition>
</template>

<script>
// @flow

export default {
  name: 'ScrollTop',
  data() {
    return {
      visible: false,
      intervalId: undefined
    }
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollListener)
    clearInterval(this.intervalId)
  },
  mounted() {
    window.addEventListener('scroll', this.scrollListener)
  },
  methods: {
    scrollTop() {
      this.intervalId = setInterval(() => {
        if (window.pageYOffset === 0) {
          clearInterval(this.intervalId)
        }
        window.scroll(0, window.pageYOffset - 50)
      }, 5)
    },
    scrollListener(e) {
      this.visible = window.scrollY > 1000
    }
  }
}
</script>
