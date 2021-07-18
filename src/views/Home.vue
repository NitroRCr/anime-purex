<template>
  <div class="home">
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <a href="javascript:;" class="mdui-typo-title">PureX</a>
        <div class="mdui-toolbar-spacer"></div>
        <router-link to="/search" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">search</i></router-link
        >
        <a href="javascript:;" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">more_vert</i></a
        >
      </div>
      <div class="mdui-tab mdui-color-theme" mdui-tab>
        <a href="#random-illusts" class="mdui-ripple mdui-ripple-white">发现</a>
        <a href="#rank-illusts" class="mdui-ripple mdui-ripple-white">排行</a>
      </div>
    </div>
    <div id="random-illusts">
      <div class="mdui-container">
        <illust-list :query="{}" :sort="common.IllustSort.RANDOM"></illust-list>
      </div>
    </div>
    <div id="rank-illusts">
      <div class="mdui-container">
        <illust-list :query="{}" :sort="common.IllustSort.LIKES"></illust-list>
      </div>
    </div>
  </div>
</template>

<script>
import IllustList from '@/components/IllustList.vue'
import common from '@/common.vue'
import mdui from 'mdui'
const $ = mdui.$

export default {
  name: 'Home',
  components: {
    IllustList
  },
  data: () => ({
    common
  }),
  mounted () {
    $('body').addClass('mdui-appbar-with-tab mdui-appbar-with-toolbar')
    mdui.mutation()
  },
  beforeDestroy () {
    $('body').removeClass('mdui-appbar-with-tab mdui-appbar-with-toolbar')
  }
}
</script>
