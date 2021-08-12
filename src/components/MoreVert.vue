<template>
  <div class="top-more-vert">
    <a
      href="javascript:;"
      mdui-menu="{target: '#top-more-vert-menu'}"
      class="mdui-btn mdui-btn-icon"
    >
      <i class="mdui-icon material-icons">more_vert</i>
    </a>
    <ul ref="meum" class="mdui-menu" id="top-more-vert-menu">
      <li class="mdui-menu-item">
        <a href="javascript:;" @click="copyLink" class="mdui-ripple">复制链接</a>
      </li>
      <li class="mdui-menu-item">
        <router-link to="/about" class="mdui-ripple">关于</router-link>
      </li>
      <li class="mdui-menu-item">
        <router-link to="/favorited" class="mdui-ripple">已收藏/关注</router-link>
      </li>
      <li class="mdui-menu-item">
        <a href="javascript:;" class="mdui-ripple" mdui-dialog="{target: '#dialog-theme'}">主题颜色</a>
      </li>
      <li class="mdui-menu-item" v-if="!$root.xuser">
        <router-link to="/login" class="mdui-ripple">登录</router-link>
      </li>
      <li class="mdui-menu-item" v-if="$root.xuser">
        <a @click="$root.clearXuser" href="javascript:;" class="mdui-ripple">退出登录</a>
      </li>
    </ul>
  </div>
</template>
<script>
import common from '@/common'
export default {
  name: 'MoreVert',
  data: () => ({
    common
  }),
  activated () {
    this.$refs.meum.classList.remove('mdui-menu-closing')
  },
  methods: {
    copyLink () {
      common.copyText(location.href)
    }
  }
}
</script>
<style lang="scss" scoped>
.top-more-vert {
  margin: 0 4px;
  flex-shrink: 0;
  a {
    min-width: 48px;
    height: 48px;
  }
}
</style>
