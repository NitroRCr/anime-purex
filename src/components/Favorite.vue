<template>
  <button class="favorite-btn mdui-btn-icon mdui-btn" @click="toggle()" :style="style"><i class="mdui-icon material-icons">{{ icon }}</i></button>
</template>
<script>
import mdui from 'mdui'
export default {
  name: 'Favorite',
  props: {
    illust: { required: true }
  },
  data: function () {
    return { favorited: this.isfavorited() }
  },
  computed: {
    style () {
      if (this.favorited) {
        return { color: 'rgb(255, 64, 96)' }
      } else {
        return {}
      }
    },
    icon () {
      return this.favorited ? 'favorite' : 'favorite_border'
    }
  },
  methods: {
    isfavorited () {
      if (this.indexOf(this.illust.id) === -1) {
        return false
      } else {
        return true
      }
    },
    toggle () {
      const favorited = this.isfavorited()
      const list = JSON.parse(localStorage.favoritedList)
      if (favorited) {
        list.splice(this.indexOf(this.illust.id), 1)
        this.favorited = false
      } else {
        if (list.length >= 1000) {
          mdui.snackbar('图片太多，装不下了~')
          return
        }
        list.push(this.illust)
        this.favorited = true
      }
      localStorage.favoritedList = JSON.stringify(list)
    },
    indexOf (illustId) {
      const list = JSON.parse(localStorage.favoritedList)
      for (const i in list) {
        if (list[i].id === illustId) return i
      }
      return -1
    }
  }
}
</script>
