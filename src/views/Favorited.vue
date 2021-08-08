<template>
  <div id="favorited-view">
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <a href="javascript:;" @click="$emit('back')" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">arrow_back</i></a
        >
        <span class="mdui-typo-title">收藏/关注</span>
        <div class="mdui-toolbar-spacer"></div>
        <router-link to="/search" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">search</i></router-link
        >
        <more-vert></more-vert>
      </div>
      <div class="mdui-tab mdui-color-theme" mdui-tab>
        <a href="#favorited" class="mdui-ripple mdui-ripple-white">收藏</a>
        <a href="#followings" class="mdui-ripple mdui-ripple-white">关注</a>
      </div>
    </div>
    <div id="favorited">
      <div class="mdui-container">
        <illust-list :staticIllusts="illusts"></illust-list>
      </div>
    </div>
    <div id="followings">
      <div class="mdui-container">
        <user-list :staticUsers="users"></user-list>
      </div>
    </div>
  </div>
</template>
<script>
import IllustList from '../components/IllustList.vue'
import MoreVert from '../components/MoreVert.vue'
import UserList from '../components/UserList.vue'
import mdui from 'mdui'
const $ = mdui.$
export default {
  name: 'Favorited',
  components: {
    IllustList,
    MoreVert,
    UserList
  },
  data: () => ({
    illusts: JSON.parse(localStorage.favoritedList).reverse(),
    users: JSON.parse(localStorage.followings)
  }),
  mounted () {
    $('body').addClass('mdui-appbar-with-tab mdui-appbar-with-toolbar')
  },
  beforeDestroy () {
    $('body').removeClass('mdui-appbar-with-tab mdui-appbar-with-toolbar')
  }
}
</script>
