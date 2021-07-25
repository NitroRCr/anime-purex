<template>
  <div id="app">
    <keep-alive :include="['Home', 'Search', 'Tag']">
      <router-view />
    </keep-alive>
    <dialog-theme></dialog-theme>
  </div>
</template>
<script>
import DialogTheme from './components/DialogTheme.vue'
export default {
  name: 'App',
  components: {
    DialogTheme
  }
}
</script>
<style lang="scss">
a {
  color: inherit;
}
</style>
