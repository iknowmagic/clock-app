<template>
  <div class="main">
    <div class="main-header"></div>
    <div class="main-body">
      <router-view />
    </div>
    <div class="main-footer"></div>
  </div>
</template>

<script>
// @flow

export default {
  name: 'MainLayout'
}
</script>
