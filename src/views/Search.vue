<template>
  <div id="search-illust">
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <a href="javascript:;" @click="$router.back()" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">arrow_back</i></a
        >
        <a href="javascript:;" class="mdui-typo-title">搜索</a>
        <div class="mdui-toolbar-spacer"></div>
        <more-vert></more-vert>
      </div>
      <div class="mdui-tab mdui-color-theme" mdui-tab>
        <a href="#illust-search" class="mdui-ripple mdui-ripple-white">插图</a>
        <a href="#user-search" class="mdui-ripple mdui-ripple-white"
          >画师</a
        >
      </div>
    </div>
    <illust-search ref="illustList" id="illust-search"></illust-search>
    <div id="user-search"></div>
  </div>
</template>
<script>
import IllustSearch from '../components/IllustSearch.vue'
import MoreVert from '../components/MoreVert.vue'
import mdui from 'mdui'
const $ = mdui.$
export default {
  name: 'Search',
  components: {
    IllustSearch,
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
