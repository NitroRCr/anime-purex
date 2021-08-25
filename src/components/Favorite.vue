<template>
  <button
    class="favorite-btn mdui-btn-icon mdui-btn"
    @click="toggle()"
    :style="style"
  >
    <i class="mdui-icon material-icons">{{ icon }}</i>
  </button>
</template>
<script>
import mdui from 'mdui'
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
        const list = this.$root.defaultFavList
        if (this.favorited) {
          list.ids.splice(list.ids.indexOf(this.illust.id), 1)
        } else {
          list.ids.push(this.illust.id)
          this.$root.settings.favoriteToast && mdui.snackbar(`已收藏到 "${list.name}"`, { timeout: 2000 })
        }
        return this.$root.putXuserData()
      }).catch(() => {
        mdui.snackbar('同步失败')
      })
    }
  }
}
</script>
