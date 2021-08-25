import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import mdui from 'mdui'
import common from '@/common.vue'

Vue.config.productionTip = false
const $ = mdui.$

new Vue({
  router,
  render: h => h(App),
  data: () => ({
    xuser: localStorage.xuser ? JSON.parse(localStorage.xuser) : null,
    favorited: null,
    following: null,
    settings: localStorage.settings ? JSON.parse(localStorage.settings) : {
      longPressToHome: true,
      favoriteToast: true,
      anime4k: true
    }
  }),
  mounted () {
    if (this.xuser) this.getXuserData()
  },
  methods: {
    setXuser (name, token) {
      this.xuser = {
        name,
        token
      }
      localStorage.xuser = JSON.stringify(this.xuser)
    },
    clearXuser () {
      this.xuser = null
      localStorage.xuser = ''
    },
    getXuserData () {
      return new Promise((resolve, reject) => {
        if (!this.xuser) {
          this.$router.replace('/login')
          reject(Error('Not logged in'))
        }
        $.ajax({
          url: `${common.apiHost}/xusers/${this.xuser.name}`,
          headers: {
            Authorization: this.xuser.token
          },
          dataType: 'json',
          timeout: 10000,
          success: ({ favorited, following }) => {
            this.favorited = favorited
            this.following = following
            resolve()
          },
          error: (xhr, errText, error) => {
            switch (xhr.status) {
              case 401:
                this.clearXuser()
                this.$router.replace('/login')
                break
              default:
                mdui.snackbar('用户数据获取失败')
                break
            }
            reject(error)
          }
        })
      })
    },
    putXuserData () {
      return new Promise((resolve, reject) => {
        if (!this.xuser) {
          this.$router.push('/login')
          reject(Error('Not logged in'))
        }
        $.ajax({
          method: 'PUT',
          url: `${common.apiHost}/xusers/${this.xuser.name}`,
          data: {
            favorited: JSON.stringify(this.favorited),
            following: JSON.stringify(this.following)
          },
          headers: {
            Authorization: this.xuser.token
          },
          dataType: 'json',
          timeout: 10000,
          success: resp => {
            resolve()
          },
          error: (xhr, errText, error) => {
            switch (xhr.status) {
              case 403:
                this.clearXuser()
                this.$router.push('/login')
                break
              default:
                mdui.snackbar('用户数据上传失败')
                break
            }
            reject(error)
          }
        })
      })
    },
    toCreateList () {
      this.$router.push('/favorited')
      mdui.snackbar('需要设定一个收藏单')
    },
    putOldData () {
      if (localStorage.favoritedList) {
        const list = JSON.parse(localStorage.favoritedList)
        const ids = []
        for (const illust of list) ids.push(illust.id)
        this.getXuserData().then(() => {
          this.favorited.push({
            name: '旧版本',
            default: !this.defaultFavList,
            ids
          })
          return this.putXuserData()
        }).then(() => {
          localStorage.favoritedList = ''
        }).catch(err => {
          console.log(err)
          console.log('putOldData failed')
        })
      }
      if (localStorage.followings) {
        const list = JSON.parse(localStorage.followings)
        this.getXuserData().then(() => {
          for (const user of list) {
            if (this.following.indexOf(user.id) === -1) {
              this.following.push(user.id)
            }
          }
          return this.putXuserData()
        }).then(() => {
          localStorage.followings = ''
        }).catch(err => {
          console.log(err)
          console.log('putOldData failed')
        })
      }
    }
  },
  computed: {
    defaultFavList () {
      if (!this.favorited) return null
      return this.favorited.find(item => item.default)
    }
  },
  watch: {
    settings: {
      handler () {
        localStorage.settings = JSON.stringify(this.settings)
      },
      deep: true
    }
  }
}).$mount('#app')
