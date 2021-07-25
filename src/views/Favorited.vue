<template>
  <div id="favorited-view">
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <a
          href="javascript:;"
          @click="$router.back()"
          class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">arrow_back</i></a
        >
        <a href="javascript:;" class="mdui-typo-title">收藏列表</a>
        <div class="mdui-toolbar-spacer"></div>
        <router-link to="/search" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">search</i></router-link
        >
        <more-vert></more-vert>
      </div>
      <div class="mdui-tab mdui-color-theme" mdui-tab>
        <a href="#favorite-illusts" class="mdui-ripple mdui-ripple-white"
          >插图</a
        >
        <a href="#collected-tags" class="mdui-ripple mdui-ripple-white">标签</a>
      </div>
    </div>
    <div id="favorite-illusts">
      <div class="mdui-container">
        <illust-list :staticIllusts="illusts"></illust-list>
      </div>
    </div>
    <div id="collected-tags">
      <div class="mdui-container">

      </div>
    </div>
  </div>
</template>
<script>
import IllustList from '../components/IllustList.vue'
import MoreVert from '../components/MoreVert.vue'
import mdui from 'mdui'
const $ = mdui.$
export default {
  name: 'Favorited',
  components: {
    IllustList,
    MoreVert
  },
  data: () => ({
    illusts: JSON.parse(localStorage.favoritedList),
    tags: JSON.parse(localStorage.collectedTags)
  }),
  mounted () {
    $('body').addClass('mdui-appbar-with-tab mdui-appbar-with-toolbar')
  },
  beforeDestroy () {
    $('body').removeClass('mdui-appbar-with-tab mdui-appbar-with-toolbar')
  }
}
</script>
