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
        <a href="javascript:;" @click="copyLink" class="mdui-ripple"
          ><i class="mdui-menu-item-icon mdui-icon material-icons">link</i
          >复制链接</a
        >
      </li>
      <div class="mdui-divider"></div>
      <li class="mdui-menu-item" v-if="$root.xuser">
        <router-link to="/favorited" class="mdui-ripple"
          ><i class="mdui-menu-item-icon mdui-icon material-icons"
            >favorite_border</i
          >已收藏/关注</router-link
        >
      </li>
      <li class="mdui-menu-item" v-if="!$root.xuser">
        <router-link to="/login" class="mdui-ripple"
          ><i class="mdui-menu-item-icon mdui-icon material-icons"
            >person_add</i
          >登录</router-link
        >
      </li>
      <li class="mdui-menu-item" v-else>
        <a @click="$root.clearXuser" href="javascript:;" class="mdui-ripple"
          ><i class="mdui-menu-item-icon mdui-icon material-icons"
            >exit_to_app</i
          >退出登录</a
        >
      </li>
      <div class="mdui-divider"></div>
      <li class="mdui-menu-item">
        <router-link to="/settings" class="mdui-ripple"
          ><i class="mdui-menu-item-icon mdui-icon material-icons">settings</i
          >设置</router-link
        >
      </li>
      <li class="mdui-menu-item">
        <router-link to="/about" class="mdui-ripple"
          ><i class="mdui-menu-item-icon mdui-icon material-icons">info_outline</i
          >关于</router-link
        >
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
<style lang="scss">
.top-more-vert {
  margin: 0 4px;
  flex-shrink: 0;
  a {
    min-width: 48px;
    height: 48px;
  }
}
.mdui-theme-layout-dark .mdui-menu-item-icon.mdui-icon {
    color: #fff;
}
.mdui-menu-item-icon.mdui-icon {
  color: rgba(#000, 0.54);
}
</style>
