<template>
  <div id="app">
    <keep-alive :include="['Home', 'Search', 'Tag', 'User', 'Favorited']">
      <router-view
        @back="backPage"
        @backhome="$root.settings.longPressToHome && $router.push('/')"
      />
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
  },
  methods: {
    backPage () {
      if (sessionStorage.homeAccessed) {
        this.$router.back()
      } else {
        this.$router.replace('/')
      }
    }
  }
}
</script>
<style lang="scss">
a {
  color: inherit;
}
</style>
