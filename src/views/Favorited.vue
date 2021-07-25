<template>
  <div id="favorited-view">
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <a href="javascript:;" @click="$router.back()" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">arrow_back</i></a
        >
        <a href="javascript:;" class="mdui-typo-title">收藏列表</a>
        <div class="mdui-toolbar-spacer"></div>
        <router-link to="/search" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">search</i></router-link
        >
        <more-vert></more-vert>
      </div>
    </div>
    <div class="mdui-container">
      <illust-list :staticIllusts="illusts"></illust-list>
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
    illusts: JSON.parse(localStorage.favoritedList)
  }),
  mounted () {
    $('body').addClass('mdui-appbar-with-toolbar')
  },
  beforeDestroy () {
    $('body').removeClass('mdui-appbar-with-toolbar')
  }
}
</script>
