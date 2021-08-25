<template>
  <div class="home">
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <span class="mdui-typo-title">PureX</span>
        <div class="mdui-toolbar-spacer"></div>
        <router-link to="/search" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">search</i></router-link
        >
        <more-vert></more-vert>
      </div>
      <div class="mdui-tab mdui-color-theme" mdui-tab>
        <a href="#illusts-illust" @click="focusTab(0)" class="mdui-ripple mdui-ripple-white">插画</a>
        <a href="#illusts-manga" @click="focusTab(1)" class="mdui-ripple mdui-ripple-white">漫画</a>
      </div>
    </div>
    <div v-show="focusedTab === 0">
      <div class="mdui-container">
        <illust-list ref="illusts" :originSort="common.IllustSort.RANDOM" :originEvals="['quality_v1']" originType="illust"></illust-list>
      </div>
    </div>
    <div v-show="focusedTab === 1">
      <div class="mdui-container">
        <illust-list ref="mangas" :originSort="common.IllustSort.RANDOM" originType="manga"></illust-list>
      </div>
    </div>
  </div>
</template>

<script>
import IllustList from '@/components/IllustList.vue'
import MoreVert from '../components/MoreVert.vue'
import common from '@/common.vue'
import mdui from 'mdui'
const $ = mdui.$

export default {
  name: 'Home',
  components: {
    IllustList,
    MoreVert
  },
  data: () => ({
    common,
    focusedTab: 0
  }),
  activated () {
    $('body').addClass('mdui-appbar-with-tab mdui-appbar-with-toolbar')
    sessionStorage.homeAccessed = true
    mdui.mutation()
  },
  deactivated () {
    $('body').removeClass('mdui-appbar-with-tab mdui-appbar-with-toolbar')
  },
  methods: {
    focusTab (index) {
      if (index === this.focusedTab) {
        document.body.scrollIntoView({ behavior: 'smooth' })
        if (index === 0) this.$refs.illusts.refresh()
        else if (index === 1) this.$refs.mangas.refresh()
      } else {
        document.body.scrollIntoView()
        this.focusedTab = index
      }
    }
  }
}
</script>
