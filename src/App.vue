<template>
  <div id="app">
    <keep-alive :include="['Home', 'Search', 'Tag', 'User', 'Favorited']">
      <router-view
        @back="backPage"
        @backhome="$root.settings.longPressToHome && $router.push('/')"
      />
    </keep-alive>
    <div class="dialogs">
      <dialog-theme></dialog-theme>
      <list-select></list-select>
    </div>
  </div>
</template>
<script>
import DialogTheme from './components/DialogTheme.vue'
import ListSelect from './components/ListSelect.vue'
export default {
  name: 'App',
  components: {
    DialogTheme,
    ListSelect
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
