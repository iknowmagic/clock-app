<template>
  <div :class="['main', 'home', { 'main-open': showFooter }]">
    <transition mode="out-in" name="">
      <div v-if="!showFooter" class="main-header">
        <div class="quote">
          <div class="quote-text">
            <template v-if="quoteLoaded">"{{ quote.quote[0] }}"</template>
            <div v-if="!quoteLoaded" class="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div class="quote-author">
            <template v-if="quoteLoaded">
              {{ quote.author }}
            </template>
            <content-loader
              v-if="!quoteLoaded"
              :width="400"
              :height="6"
              :speed="1"
              primary-color="#f3f3f3"
              secondary-color="#ecebeb"
            >
              <rect x="5" y="0" rx="3" ry="3" width="100" height="6" />
            </content-loader>
          </div>
        </div>
        <div class="quote-refresh" @click="getQuote">
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
        <div class="divider"></div>
      </div>
    </transition>
  </div>
</template>

<script>
// @flow

import { get } from 'vuex-pathify'

import vButton from '@/components/vButton'

import axios from 'axios'
import { ContentLoader } from 'vue-content-loader'

export default {
  name: 'MainLayout',
  components: {
    vButton,

    ContentLoader
  },
  data() {
    return {
      loaded: true,
      quoteLoaded: true,
      quote: undefined
    }
  },
  computed: {
    showFooter: get('app/showFooter')
  },
  mounted() {
    this.getQuote()
  },
  methods: {
    async getQuote() {
      this.quoteLoaded = false
      const { data } = await axios.get(
        'https://magic-quotes.herokuapp.com/quote/random'
      )
      this.quote = data
      this.quoteLoaded = true
    }
  }
}
</script>
