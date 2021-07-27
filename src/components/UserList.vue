<template>
  <div class="user-list">
    <user-brief v-for="user of (staticUsers || users)" :key="user.id" :user="user"></user-brief>
  </div>
</template>
<script>
import UserBrief from './UserBrief.vue'
import common from '@/common.vue'
import mdui from 'mdui'
const $ = mdui.$
export default {
  name: 'UserList',
  props: ['text', 'staticUsers'],
  components: {
    UserBrief
  },
  data: () => ({
    users: []
  }),
  mounted () {
    if (!this.staticUsers) {
      this.getUsers()
    }
  },
  methods: {
    getUsers () {
      $.ajax({
        url: common.apiHost + '/users',
        data: {
          search: JSON.stringify({
            limit: 20,
            offset: 0,
            query: {
              text: this.text
            }
          })
        },
        dataType: 'json',
        timeout: 10000,
        success: users => {
          this.users = users
        },
        error: (jqXHR, textStatus, errorThrown) => {
          mdui.snackbar(`用户获取失败: ${textStatus}`, { timeout: 2000 })
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
</style>
