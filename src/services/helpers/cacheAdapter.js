import axios from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'

// 24 hrs
function setWithExpiry(key, value, ttl = 1000 * 60 * 60 * 24) {
  const now = new Date()

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl
  }
  localStorage.setItem(key, JSON.stringify(item))
}

function getWithExpiry(key) {
  const itemString = localStorage.getItem(key)
  // if the item doesn't exist, return null
  if (!itemString) {
    return undefined
  }
  const item = JSON.parse(itemString)
  const now = new Date()
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return undefined
    localStorage.removeItem(key)
    return undefined
  }
  return item.value
}

const lsCache = {
  get(key) {
    // console.log('set', key)
    const returnValue = getWithExpiry(key)

    if (!returnValue) return false
    return Promise.resolve(returnValue)
  },
  async set(key, value) {
    // console.log('set', key)
    return setWithExpiry(key, await value)
  },
  del(key) {
    // console.log('del', key)
    return localStorage.removeItem(key)
  }
}

export default cacheAdapterEnhancer(axios.defaults.adapter, {
  defaultCache: lsCache
})
