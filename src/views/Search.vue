<template>
  <div id="search-illust">
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <a href="javascript:;" @click="$emit('back')" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">arrow_back</i></a
        >
        <span class="mdui-typo-title">搜索</span>
        <div class="mdui-toolbar-spacer"></div>
        <more-vert></more-vert>
      </div>
      <div class="mdui-tab mdui-color-theme" mdui-tab>
        <a href="#illust-search" class="mdui-ripple mdui-ripple-white">作品</a>
        <a href="#user-search" class="mdui-ripple mdui-ripple-white"
          >画师</a
        >
      </div>
    </div>
    <illust-search id="illust-search"></illust-search>
    <user-search id="user-search"></user-search>
  </div>
</template>
<script>
import IllustSearch from '../components/IllustSearch.vue'
import UserSearch from '../components/UserSearch.vue'
import MoreVert from '../components/MoreVert.vue'
import mdui from 'mdui'
const $ = mdui.$
export default {
  name: 'Search',
  components: {
    IllustSearch,
    UserSearch,
    MoreVert
  },
  activated () {
    $('body').addClass('mdui-appbar-with-tab mdui-appbar-with-toolbar')
    mdui.mutation()
  },
  deactivated () {
    $('body').removeClass('mdui-appbar-with-tab mdui-appbar-with-toolbar')
  }
}
</script>
