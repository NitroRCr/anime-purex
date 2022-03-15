<template>
  <div class="download-image">
    <button class="mdui-btn mdui-btn-icon" mdui-menu="{target: '.download-image .mdui-menu'}">
      <i class="mdui-icon material-icons">file_download</i>
    </button>
    <ul class="mdui-menu">
      <li class="mdui-menu-item">
        <a @click="download(url.original, `${prefix}_original.${originalExt}`)" class="mdui-ripple">原图</a>
      </li>
      <li class="mdui-menu-item">
        <a @click="download(url.large_webp, `${prefix}_large.webp`)" class="mdui-ripple">高清图-webp</a>
      </li>
      <li class="mdui-menu-item">
        <a @click="download(url.large_jpg, `${prefix}_large.jpg`)" class="mdui-ripple">高清图-jpg</a>
      </li>
      <li class="mdui-menu-item">
        <a v-if="urls.length > 1" @click="downloadAll" class="mdui-ripple">下载全部-webp</a>
      </li>
    </ul>
  </div>
</template>
<script>
import common from '@/common.vue'
export default {
  name: 'DownloadImage',
  props: ['urls', 'title', 'currIndex'],
  data: () => ({ common }),
  methods: {
    download (url, fileName) {
      const a = document.createElement('a')
      a.href = encodeURI(`${common.apiHost}/download${url}?filename=${fileName}`)
      a.click()
    },
    downloadAll () {
      for (const i in this.urls) {
        const url = this.urls[i]
        this.download(url.large_webp, `${this.title}_p${i}_large.webp`)
      }
    }
  },
  computed: {
    url () {
      return this.urls[this.currIndex]
    },
    prefix () {
      return `${this.title}_p${this.currIndex}`
    },
    originalExt () {
      return this.url.original.split('.').pop()
    }
  }
}
</script>
<style lang="scss" scoped>
.download-image {
  display: inline-block;
}
</style>
