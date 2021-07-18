<template>
  <button class="favorite-btn mdui-btn-icon mdui-btn" @click="toggle()" :style="style"><i class="mdui-icon material-icons">{{ icon }}</i></button>
</template>
<script>
export default {
  name: 'Favorite',
  props: ['illustId'],
  data: function () {
    return { favorited: this.isfavorited() }
  },
  beforeCreate () {
    if (localStorage.favoritedList === undefined) {
      localStorage.favoritedList = JSON.stringify([])
    }
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
      const list = localStorage.favoritedList
      if (list.indexOf(this.illustId) === -1) {
        return false
      } else {
        return true
      }
    },
    toggle () {
      const favorited = this.isfavorited()
      const list = JSON.parse(localStorage.favoritedList)
      if (favorited) {
        list.splice(list.indexOf(this.illustId), 1)
        this.favorited = false
      } else {
        list.push(this.illustId)
        this.favorited = true
      }
      localStorage.favoritedList = JSON.stringify(list)
    }
  }
}
</script>
