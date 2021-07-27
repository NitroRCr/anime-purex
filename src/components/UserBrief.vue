<template>
  <div class="user-brief">
    <div
      class="user-avatar"
      :style="{
        backgroundImage: `url(${common.apiHost + user.avatar_url})`,
      }"
    ></div>
    <div class="user-name">{{ user.name }}</div>
    <button
      @click="toggle"
      class="follow-btn mdui-btn mdui-btn-raised mdui-ripple mdui-btn-dense"
      :class="{ 'mdui-color-theme-accent': !followed }"
    >
      {{ followed ? "已关注" : "关注" }}
    </button>
  </div>
</template>
<script>
import mdui from 'mdui'
import common from '@/common.vue'
export default {
  name: 'UserBrief',
  props: {
    user: { required: true }
  },
  data: function () {
    return {
      followed: this.isFollowed(),
      common
    }
  },
  activated () {
    this.followed = this.isFollowed()
  },
  methods: {
    isFollowed () {
      if (this.indexOf(this.user.id) === -1) {
        return false
      } else {
        return true
      }
    },
    toggle () {
      const followed = this.isFollowed()
      const list = JSON.parse(localStorage.followings)
      if (followed) {
        list.splice(this.indexOf(this.user.id), 1)
        this.followed = false
      } else {
        if (list.length >= 1000) {
          mdui.snackbar('关注太多，装不下了~')
          return
        }
        list.push(this.user)
        this.followed = true
      }
      localStorage.followings = JSON.stringify(list)
    },
    indexOf (userId) {
      const list = JSON.parse(localStorage.followings)
      for (const i in list) {
        if (list[i].id === userId) return i
      }
      return -1
    }
  }
}
</script>
<style lang="scss" scoped>
.user-brief {
  height: 30px;
  margin: 5px;
  text-align: left;
  display: flex;
  align-items: center;
  .user-avatar {
    height: 30px;
    width: 30px;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
  }
  .user-name {
    margin-top: 2px;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.15;
    display: inline-block;
    margin-left: 8px;
  }
  .follow-btn {
    position: absolute;
    right: 10px;
  }
}
</style>
