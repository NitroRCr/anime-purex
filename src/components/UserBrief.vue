<template>
  <div class="user-brief mdui-ripple" @click.self="$router.push(`/users/${user.id}`).catch(()=>{})">
    <div
      class="user-avatar"
      :style="{
        backgroundImage: `url(${common.apiHost + user.avatar_url})`,
      }"
    ></div>
    <div class="user-name">{{ user.name }}</div>
    <origin-url :user="user"></origin-url>
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
import OriginUrl from './OriginUrl.vue'
import common from '@/common.vue'
export default {
  name: 'UserBrief',
  props: {
    user: { required: true }
  },
  components: {
    OriginUrl
  },
  data: function () {
    return {
      common
    }
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
      this.$root.getXuserData().then(() => {
        const list = this.$root.following
        if (this.followed) {
          list.splice(list.indexOf(this.user.id), 1)
        } else {
          list.push(this.user.id)
        }
        this.$root.putXuserData()
      })
    }
  },
  computed: {
    followed () {
      const list = this.$root.following
      if (!list) return false
      return list.indexOf(this.user.id) !== -1
    }
  }
}
</script>
<style lang="scss" scoped>
.user-brief {
  height: 30px;
  padding: 10px 5px;
  text-align: left;
  display: flex;
  align-items: center;
  .user-avatar {
    height: 30px;
    width: 30px;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    z-index: -1;
  }
  .user-name {
    margin-top: 2px;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.15;
    display: inline-block;
    margin-left: 8px;
    z-index: -1;
  }
  .follow-btn {
    position: absolute;
    right: 10px;
  }
}
</style>
