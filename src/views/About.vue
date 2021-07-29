<template>
  <div class="about">
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <a
          href="javascript:;"
          @click="$emit('back')"
          class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">arrow_back</i></a
        >
        <span class="mdui-typo-title">关于</span>
        <div class="mdui-toolbar-spacer"></div>
        <router-link to="/search" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">search</i></router-link
        >
        <more-vert></more-vert>
      </div>
    </div>
    <div class="mdui-container">
      <div class="mdui-typo">
        <h2>Anime PureX</h2>
        <p>此网站是对pixiv上的图片的整理，旨在分享高质量的二次元图片。非盈利，无广告。<br>
        所有图片我们都会提供原链接，若仍然侵犯了版权，可联系我们删除。</p>
        <h2>特性</h2>
        <ul>
          <li>基于Vue开发</li>
          <li>全站webp支持</li>
          <li>PWA支持</li>
        </ul>
        <h2>开发者</h2>
        <ul class="mdui-list developers">
          <li class="mdui-list-item mdui-ripple" @click="go('https://github.com/NitroRCr')">
            <div class="mdui-list-item-avatar"><img src="img/avatar1.png"/></div>
            <div class="mdui-list-item-content">NitroFire</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import MoreVert from '../components/MoreVert.vue'
import mdui from 'mdui'
const $ = mdui.$
export default {
  name: 'About',
  components: {
    MoreVert
  },
  mounted () {
    $('body').addClass('mdui-appbar-with-toolbar')
  },
  beforeDestroy () {
    $('body').removeClass('mdui-appbar-with-toolbar')
  },
  methods: {
    go (url) {
      window.open(url, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
.mdui-typo h1,
.mdui-typo h2 {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.mdui-typo h2 {
  padding-bottom: 7.2px;
}
.developers {
  padding: 0;
}
</style>
