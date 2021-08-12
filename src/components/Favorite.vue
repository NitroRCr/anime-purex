<template>
  <button class="favorite-btn mdui-btn-icon mdui-btn" @click="toggle()" :style="style"><i class="mdui-icon material-icons">{{ icon }}</i></button>
</template>
<script>
export default {
  name: 'Favorite',
  props: {
    illust: { required: true }
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
    },
    favorited () {
      if (!this.$root.defaultFavList) return false
      return this.$root.defaultFavList.ids.indexOf(this.illust.id) !== -1
    }
  },
  methods: {
    toggle () {
      if (!this.$root.xuser) this.$router.push('/login')
      if (!this.$root.defaultFavList) {
        this.$root.toCreateList()
        return
      }
      this.$root.getXuserData().then(() => {
        const list = this.$root.defaultFavList.ids
        if (this.favorited) {
          list.splice(list.indexOf(this.illust.id), 1)
        } else {
          list.push(this.illust.id)
        }
        this.$root.putXuserData()
      })
    }
  }
}
</script>
