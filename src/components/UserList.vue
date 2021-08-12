<template>
  <div class="user-list-container">
    <div class="user-list">
      <user-brief
        v-for="user of users"
        :key="user.id"
        :user="user"
      ></user-brief>
    </div>
    <illust-loader @load="getUsers" v-if="!noMore"></illust-loader>
    <div class="no-more" v-if="noMore">没有更多了...</div>
  </div>
</template>
<script>
import IllustLoader from './IllustLoader.vue'
import UserBrief from './UserBrief.vue'
import common from '@/common.vue'
import mdui from 'mdui'
const $ = mdui.$
export default {
  name: 'UserList',
  props: ['text', 'ids'],
  components: {
    UserBrief,
    IllustLoader
  },
  data: () => ({
    offset: 0,
    users: [],
    waiting: false,
    xhr: null,
    noMore: false,
    preventErr: false,
    limit: 20
  }),
  mounted () {
  },
  methods: {
    getUsers () {
      if (this.waiting || this.noMore) {
        return
      }
      const search = JSON.stringify(this.ids ? {
        limit: 20,
        offset: 0,
        ids: this.ids.reverse()
      } : {
        limit: 20,
        offset: 0,
        query: {
          text: this.text
        }
      })
      $.ajax({
        url: common.apiHost + '/users',
        data: {
          search
        },
        dataType: 'json',
        timeout: 10000,
        beforeSend: (xhr) => {
          this.xhr = xhr
        },
        success: users => {
          this.users = this.users.concat(users)
          this.offset += users.length
          this.waiting = false
          this.xhr = null
          for (const user of users) {
            common.cachedUsers[user.id] = user
          }
          if (users.length < this.limit) {
            this.noMore = true
          }
        },
        error: (jqXHR, textStatus, errorThrown) => {
          if (this.preventErr) return
          mdui.snackbar(`用户获取失败: ${textStatus}`, { timeout: 2000 })
          this.xhr = null
          setTimeout(() => {
            this.waiting = false
          }, 3000)
        }
      })
    }
  },
  watch: {
    text () {
      this.getUsers()
    }
  }
}
</script>
<style lang="scss" scoped>
.user-list {
  margin: 10px 0;
}
.no-more {
  margin: 10px;
  font-weight: bold;
  text-align: center;
}
</style>
