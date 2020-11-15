/**
 * Tests for true emptiness of things
 */
function empty(value) {
  // test results
  // ---------------
  // []        true, empty array
  // {}        true, empty object
  // null      true
  // undefined true
  // ""        true, empty string
  // ''        true, empty string
  // 0         false, number
  // true      false, boolean
  // false     false, boolean
  // Date      false
  // function  false
  if (typeof value === 'undefined') return true

  if (typeof value === 'string') {
    if (value.trim().length === 0) return true
  }

  if (value instanceof FormData) {
    return false
  }

  if (
    typeof value === 'function' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    Object.prototype.toString.call(value) === '[object Date]'
  ) {
    return false
  }

  if (value === null || value.length === 0) {
    // null or 0 length array
    return true
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }

  return false
}

export default empty
