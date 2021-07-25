<template>
  <div id="tag-view">
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <a href="javascript:;" @click="$router.back()" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">arrow_back</i></a
        >
        <a href="javascript:;" class="mdui-typo-title">#{{ tag }}</a>
        <div class="mdui-toolbar-spacer"></div>
        <collect ref="collect" :tag="tag"></collect>
        <router-link to="/search" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">search</i></router-link
        >
        <more-vert ref="moreVert"></more-vert>
      </div>
    </div>
    <div class="mdui-container">
      <illust-list ref="illustList" :presetTag="tag"></illust-list>
    </div>
  </div>
</template>
<script>
import IllustList from '../components/IllustList.vue'
import MoreVert from '../components/MoreVert.vue'
import Collect from '../components/Collect.vue'
import mdui from 'mdui'
const $ = mdui.$
export default {
  name: 'Tag',
  activated () {
    $('body').addClass('mdui-appbar-with-toolbar')
    this.$refs.illustList.refreshTags()
    this.$refs.collect.refresh()
  },
  deactivated () {
    $('body').removeClass('mdui-appbar-with-toolbar')
  },
  components: {
    IllustList,
    MoreVert,
    Collect
  },
  computed: {
    tag () {
      return this.$route.params.tag
    }
  }
}
</script>
