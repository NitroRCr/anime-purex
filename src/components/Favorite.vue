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
    illust: { required: true },
    originFavList: { default: null }
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
      if (!this.favList) return false
      return this.favList.ids.indexOf(this.illust.id) !== -1
    },
    favList () { return this.originFavList ?? this.$root.defaultFavList }
  },
  methods: {
    toggle () {
      if (!this.$root.xuser) this.$router.push('/login')
      if (!this.favList) {
        this.$root.toCreateList()
        return
      }
      this.$root.getXuserData().then(() => new Promise((resolve, reject) => {
        const list = this.favList
        const id = this.illust.id
        if (this.favorited) {
          this.del(list.ids, id)
          resolve(null)
        } else {
          this.add(list.ids, id)
          if (this.$root.settings.favoriteToast) {
            let selectFlag = false
            mdui.snackbar(`已收藏到 "${list.name}"`, {
              timeout: 2000,
              buttonText: '更改',
              onButtonClick: () => {
                selectFlag = true
                this.$root.selectList().then(name => {
                  resolve(name)
                })
              },
              onClosed: () => {
                selectFlag || resolve(null)
              }
            })
          } else {
            resolve(null)
          }
        }
      })).then((chName) => {
        const id = this.illust.id
        if (chName !== null) {
          this.del(this.favList.ids, id)
          this.add(this.$root.favorited.find(list => list.name === chName).ids, id)
        }
        return this.$root.putXuserData()
      }).catch((reason) => {
        console.log(reason)
        mdui.snackbar('同步失败')
      })
    },
    add (arr, item) {
      if (arr.indexOf(item) === -1) arr.push(item)
    },
    del (arr, item) {
      const index = arr.indexOf(item)
      index !== -1 && arr.splice(index, 1)
    }
  }
}
</script>
