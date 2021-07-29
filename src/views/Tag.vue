<template>
  <div id="tag-view">
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <a href="javascript:;" @click="$emit('back')" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">arrow_back</i></a
        >
        <span class="mdui-typo-title">#{{ tag }}</span>
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
    this.tag = this.$route.params.tag
  },
  deactivated () {
    $('body').removeClass('mdui-appbar-with-toolbar')
  },
  data: () => ({
    tag: null
  }),
  components: {
    IllustList,
    MoreVert,
    Collect
  }
}
</script>
