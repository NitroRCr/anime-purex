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
        <router-link to="/favorited" class="mdui-ripple">收藏列表</router-link>
      </li>
      <li class="mdui-menu-item">
        <a href="javascript:;" class="mdui-ripple" mdui-dialog="{target: '#dialog-theme'}">主题颜色</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'MoreVert',
  activated () {
    this.$refs.meum.classList.remove('mdui-menu-closing')
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
