import Vue from 'vue'

// only import the icons you use to reduce bundle size
import 'vue-awesome/icons/moon'
import 'vue-awesome/icons/map-marked-alt'
import 'vue-awesome/icons/angle-double-up'
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/angle-down'
import 'vue-awesome/icons/arrow-left'
import 'vue-awesome/icons/regular/moon'

import Icon from 'vue-awesome/components/Icon'

/* Register component */
// globally
Vue.component('v-icon', Icon)
