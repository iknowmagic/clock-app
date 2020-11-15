<template>
  <div class="not-found">
    <div class="not-found-number">404</div>
    <div class="not-found-text">
      The page that you requested cannot be found.
      <br />
      <router-link :to="{ name: 'Home' }">
        Please try going to the home page.
      </router-link>
    </div>
  </div>
</template>

<script>
// @flow

export default {
  name: 'NotFound',
  page() {
    return {
      title: 'Page Not Found'
    }
  }
}
</script>
