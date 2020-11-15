import loadingProgressInterceptor from '@/services/helpers/loadingProgressInterceptor'

// import notAuthorizedInterceptor from '@/services/helpers/notAuthorizedInterceptor'
import axios from 'axios'

// import { throttleAdapterEnhancer } from 'axios-extensions'
import cacheAdapter from './helpers/cacheAdapter'

// basic cache
// import { cacheAdapterEnhancer } from 'axios-extensions'
// const cacheConfig = {
//   enabledByDefault: false,
//   cacheFlag: 'useCache'
// }

const countryService = axios.create({
  baseURL: `https://restcountries.eu/rest/v2`,
  // withCredentials: true,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    // 'Cache-Control': 'no-cache'
  },
  // adapter: cacheAdapterEnhancer(axios.defaults.adapter, cacheConfig) // basic cache
  adapter: cacheAdapter
})

// unableToConnectInterceptor(api)

loadingProgressInterceptor(countryService)

export { countryService }
