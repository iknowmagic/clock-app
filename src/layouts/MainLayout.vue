<template>
  <div
    v-if="timeLoaded"
    :class="[
      'main',
      'home',
      { 'main-open': showFooter, evening: greetingTime === 'evening' }
    ]"
  >
    <transition mode="out-in" name="fade">
      <div class="main-header">
        <div v-if="quote" class="quote">
          <div class="quote-text">
            <template v-if="quoteLoaded">
              <div>{{ quote.text }}</div>
            </template>
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
          </div>
        </div>
        <div class="quote-refresh" @click="getQuote">
          <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.188 10.667a.208.208 0 01.147.355l-2.344 2.206a5.826 5.826 0 009.578-2.488l2.387.746A8.322 8.322 0 013.17 14.94l-2.149 2.022a.208.208 0 01-.355-.148v-6.148h6.52zm7.617-7.63L16.978.958a.208.208 0 01.355.146v6.23h-6.498a.208.208 0 01-.147-.356L13 4.765A5.825 5.825 0 003.43 7.26l-2.386-.746a8.32 8.32 0 0113.76-3.477z"
              fill="#FFF"
              fill-rule="nonzero"
              opacity=".5"
            />
          </svg>
        </div>
      </div>
    </transition>
    <div class="main-body">
      <template v-if="timeLoaded">
        <div class="greeting">
          <div class="greeting-icon">
            <img
              v-if="greetingTime === 'evening'"
              src="@/assets/images/desktop/icon-moon.svg"
              alt="moon"
            />
            <img v-else src="@/assets/images/desktop/icon-sun.svg" alt="sun" />
          </div>
          <div class="greeting-text">
            Good {{ greetingTime }}
            <span>, it's currently</span>
          </div>
        </div>
        <div v-if="clock" class="time">
          <div class="time-display">
            <div class="time-hour">
              {{ clock.hour }}
            </div>
            <div class="time-colon">:</div>
            <div class="time-minute">
              {{ clock.minute }}
            </div>
          </div>
          <div class="time-zone">{{ clock.timezone }}</div>
        </div>
        <div class="location">In {{ timeObj.city }}, {{ timeObj.country }}</div>
        <v-button />
      </template>
      <div v-if="!timeLoaded" class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <transition mode="out-in" name="fade-in">
      <div v-if="showFooter" class="main-footer">
        <div class="footer-line current-timezone">
          <div class="footer-title">Current timezone</div>
          <div class="footer-value">{{ timeObj.timezone }}</div>
        </div>
        <div class="footer-line day-of-the-year">
          <div class="footer-title">Day of the year</div>
          <div class="footer-value">{{ timeObj.day_of_year }}</div>
        </div>
        <div class="footer-line day-of-the-week">
          <div class="footer-title">Day of the week</div>
          <div class="footer-value">
            {{ timeObj.day_of_week }}
          </div>
        </div>
        <div class="footer-line week-number">
          <div class="footer-title">Week number</div>
          <div class="footer-value">
            {{ timeObj.week_number }}
          </div>
        </div>
        <div class="divider"></div>
      </div>
    </transition>
  </div>
  <div v-else class="loader">
    <div class="lds-dual-ring"></div>
  </div>
</template>

<script>
// @flow

import { get } from 'vuex-pathify'

import moment from 'moment-timezone'

import vButton from '@/components/vButton'

import axios from 'axios'

export default {
  name: 'MainLayout',
  components: {
    vButton
  },
  data() {
    return {
      loaded: true,
      quoteLoaded: false,
      quote: undefined,
      timeLoaded: false,
      timeObj: {},
      intervalId: undefined
    }
  },
  computed: {
    showFooter: get('app/showFooter'),
    clock() {
      let result
      if (this.timeObj && this.timeObj.timezone) {
        result = {
          hour: moment(this.timeObj.datetime).format('H'),
          minute: moment(this.timeObj.datetime).format('mm'),
          timezone: moment(this.timeObj.datetime)
            .tz(this.timeObj.timezone)
            .format('zz')
        }
      }
      return result
    },
    greetingTime() {
      let g
      if (this.clock) {
        var splitAfternoon = 12 // 24hr time to split the afternoon
        var splitEvening = 17 // 24hr time to split the evening
        var currentHour = parseFloat(this.clock.hour)
        // console.log({ currentHour, splitAfternoon, splitEvening })
        if (currentHour >= splitAfternoon && currentHour < splitEvening) {
          g = 'afternoon'
        } else if (currentHour >= splitEvening) {
          g = 'evening'
        } else {
          g = 'morning'
        }
      }

      return g
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  mounted() {
    this.getTime()
    this.getQuote()
  },
  methods: {
    async getTime() {
      this.timeLoaded = false
      const { data } = await axios.get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.VUE_APP_GEO_IP_KEY}`
      )
      this.timeObj = {
        timezone: data.time_zone.name,
        datetime: data.time_zone.current_time,
        city: data.city,
        country: data.country_code2
      }
      this.updateTime()
      this.intervalId = setInterval(this.updateTime, 1000)
      this.timeLoaded = true
    },
    async getQuote() {
      this.quoteLoaded = false
      const { data } = await axios.get('/api/quote')
      this.quote = data
      this.quoteLoaded = true
    },
    updateTime() {
      const obj = moment(this.timeObj.datetime)
      obj.add(1, 'seconds')
      this.timeObj.datetime = obj.toISOString(true)
      this.timeObj.day_of_year = obj.format('DDD')
      this.timeObj.day_of_week = obj.format('d')
      this.timeObj.week_number = obj.format('W')
    }
  }
}
</script>
