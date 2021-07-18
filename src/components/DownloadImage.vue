<template>
  <div class="download-image">
    <button class="mdui-btn mdui-btn-icon" mdui-menu="{target: '.download-image .mdui-menu'}">
      <i class="mdui-icon material-icons">file_download</i>
    </button>
    <ul class="mdui-menu">
      <li class="mdui-menu-item">
        <a @click="download(common.apiHost + urls.original, `${fnamePrefix}_original`)" class="mdui-ripple">原图</a>
      </li>
      <li class="mdui-menu-item">
        <a @click="download(common.apiHost + urls.large_webp, `${fnamePrefix}_large.webp`)" class="mdui-ripple">高分辨率-webp</a>
      </li>
      <li class="mdui-menu-item">
        <a @click="download(common.apiHost + urls.large_jpg, `${fnamePrefix}_large.jpg`)" class="mdui-ripple">高分辨率-jpg</a>
      </li>
      <li class="mdui-menu-item">
        <a @click="download(common.apiHost + urls.medium_webp, `${fnamePrefix}_medium.webp`)" class="mdui-ripple">中分辨率-webp</a>
      </li>
      <li class="mdui-menu-item">
        <a @click="download(common.apiHost + urls.medium_jpg, `${fnamePrefix}_medium.jpg`)" class="mdui-ripple">中分辨率-jpg</a>
      </li>
    </ul>
  </div>
</template>
<script>
import common from '@/common.vue'
export default {
  name: 'DownloadImage',
  props: ['urls', 'fnamePrefix'],
  data: () => ({ common }),
  methods: {
    download (url, fileName) {
      var x = new XMLHttpRequest()
      x.open('GET', url, true)
      x.responseType = 'blob'
      x.onload = function (e) {
        var url = window.URL.createObjectURL(x.response)
        var a = document.createElement('a')
        a.href = url
        a.download = fileName
        a.click()
      }
      x.send()
    }
  }
}
</script>
<style lang="scss" scoped>
.download-image {
  display: inline-block;
}
</style>
