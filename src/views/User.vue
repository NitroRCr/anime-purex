<template>
  <div id="user-vue">
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <a href="javascript:;" @click="$router.back()" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">arrow_back</i></a
        >
        <a href="javascript:;" class="mdui-typo-title">{{ user ? '@' + user.name : '' }}</a>
        <div class="mdui-toolbar-spacer"></div>
        <router-link to="/search" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">search</i></router-link
        >
        <more-vert ref="moreVert"></more-vert>
      </div>
    </div>
    <div class="mdui-container">
      <div class="user-info" v-if="user">
        <user-brief :user="user"></user-brief>
        <div class="comment" v-html="commentHtml"></div>
      </div>
      <illust-list ref="illustList" :user="userId"></illust-list>
    </div>
  </div>
</template>
<script>
import IllustList from '../components/IllustList.vue'
import MoreVert from '../components/MoreVert.vue'
import UserBrief from '../components/UserBrief.vue'
import common from '@/common.vue'
import mdui from 'mdui'
const $ = mdui.$
export default {
  name: 'User',
  mounted () {
    $('body').addClass('mdui-appbar-with-toolbar')
    this.getUser()
  },
  beforeDestroy () {
    $('body').removeClass('mdui-appbar-with-toolbar')
  },
  components: {
    IllustList,
    MoreVert,
    UserBrief
  },
  data: () => ({
    user: null
  }),
  computed: {
    userId () {
      return this.$route.params.id
    },
    commentHtml () {
      return this.user.comment.replaceAll('\n', '<br>')
    }
  },
  methods: {
    getUser () {
      const id = this.userId
      if (common.cachedUsers[id]) {
        this.user = common.cachedUsers[id]
        return
      }
      $.ajax({
        url: common.apiHost + '/users/' + id,
        dataType: 'json',
        timeout: 10000,
        success: (user) => {
          this.user = user
          common.cachedUsers[user.id] = user
        },
        error: (jqXHR, textStatus, errorThrown) => {
          mdui.snackbar(`用户获取失败: ${textStatus}`)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.user-info {
  .comment {
    padding: 5px;
    word-wrap: break-word;
  }
}
</style>
