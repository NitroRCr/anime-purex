<template>
  <div id="search-illust">
    <div class="mdui-appbar">
      <div class="mdui-toolbar mdui-color-theme">
        <router-link to="/" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">arrow_back</i></router-link
        >
        <a href="javascript:;" class="mdui-typo-title">搜索</a>
        <div class="mdui-toolbar-spacer"></div>
        <a href="javascript:;" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">more_vert</i></a
        >
      </div>
      <div class="mdui-tab mdui-color-theme" mdui-tab>
        <a href="#illust-search" class="mdui-ripple mdui-ripple-white">插图</a>
        <a href="#user-search" class="mdui-ripple mdui-ripple-white"
          >画师</a
        >
      </div>
    </div>
    <illust-search id="illust-search"></illust-search>
    <div id="user-search"></div>
  </div>
</template>
<script>
import IllustSearch from '../components/IllustSearch.vue'
import mdui from 'mdui'
export default {
  name: 'Search',
  components: {
    IllustSearch
  },
  mounted () {
    mdui.mutation()
  }
}
</script>
