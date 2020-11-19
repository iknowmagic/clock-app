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
              "{{ quote.quote.join(' ') }}"
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
          <img src="@/assets/images/desktop/icon-refresh.svg" alt="refresh" />
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
          <div class="greeting-text">Good {{ greetingTime }}</div>
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
        console.log({ currentHour, splitAfternoon, splitEvening })
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
      const { data: geoIP } = await axios.get(`https://freegeoip.app/json/`)
      const { data: timezone } = await axios.get(
        `https://magic-quotes.herokuapp.com/timezone/${geoIP.time_zone}`
      )
      this.timeObj = {
        day_of_year: timezone.day_of_year,
        day_of_week: timezone.day_of_week,
        timezone: timezone.timezone,
        week_number: timezone.week_number,
        datetime: timezone.datetime,
        city: geoIP.city,
        country: geoIP.country_code
      }
      this.intervalId = setInterval(this.updateTime, 1000)
      this.timeLoaded = true
    },
    async getQuote() {
      this.quoteLoaded = false
      const { data } = await axios.get(
        'https://magic-quotes.herokuapp.com/quote/random'
      )
      this.quote = data
      this.quoteLoaded = true
    },
    updateTime() {
      const obj = moment(this.timeObj.datetime)
      obj.add(1, 'seconds')
      this.timeObj.datetime = obj.toISOString(true)
    }
  }
}
</script>
