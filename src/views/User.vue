<template>
  <div id="user-view">
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <back-btn
          @click="$emit('back')"
          @longpress="$emit('backhome')"
        ></back-btn>
        <span class="mdui-typo-title">{{ user ? "@" + user.name : "" }}</span>
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
        <div class="comment">
          <translatable
            :text="user.comment"
            :enable="enableTranslate"
          ></translatable>
        </div>
      </div>
      <div class="translate-control">
        <div class="control-name">机翻</div>
        <label class="mdui-switch">
          <input type="checkbox" v-model="enableTranslate" />
          <i class="mdui-switch-icon"></i>
        </label>
      </div>
      <illust-list ref="illustList" :user="userId"></illust-list>
    </div>
  </div>
</template>
<script>
import IllustList from '../components/IllustList.vue'
import MoreVert from '../components/MoreVert.vue'
import UserBrief from '../components/UserBrief.vue'
import Translatable from '../components/Translatable.vue'
import BackBtn from '../components/BackBtn.vue'
import common from '@/common.vue'
import mdui from 'mdui'
const $ = mdui.$
export default {
  name: 'User',
  activated () {
    $('body').addClass('mdui-appbar-with-toolbar')
    this.userId = this.$route.params.id
    this.getUser()
  },
  deactivated () {
    $('body').removeClass('mdui-appbar-with-toolbar')
  },
  components: {
    IllustList,
    MoreVert,
    UserBrief,
    Translatable,
    BackBtn
  },
  data: () => ({
    user: null,
    enableTranslate: false,
    userId: null
  }),
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
.translate-control {
    display: flex;
    align-items: center;
    margin: 5px;
    .control-name {
      font-weight: bold;
      flex-shrink: 0;
      margin-right: 15px;
    }
    .mdui-switch {
      padding-right: 5px;
    }
  }
</style>
