<template>
  <a
    class="mdui-btn mdui-btn-icon origin-url"
    mdui-tooltip="{content: '原链接'}"
    target="_blank"
    :href="url"
    ><i class="mdui-icon material-icons">link</i></a
  >
</template>
<script>
import common from '@/common.vue'
export default {
  name: 'OrigainUrl',
  props: ['illust', 'user'],
  computed: {
    url () {
      if (this.illust) {
        if (this.illust.type === common.APIType.PIXIV) {
          return `https://www.pixiv.net/artworks/${this.illust.type_id}`
        } else {
          return 'javascript:;'
        }
      } else {
        if (this.user.type === common.APIType.PIXIV) {
          return `https://www.pixiv.net/users/${this.user.type_id}`
        } else {
          return 'javascript:;'
        }
      }
    }
  }
}
</script>
