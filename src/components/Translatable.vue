<template>
  <span class="translatable" v-html="showHtml"></span>
</template>
<script>
import common from '@/common.vue'
import mdui from 'mdui'
import CryptoJS from 'crypto-js'
function truncate (q) {
  var len = q.length
  if (len <= 20) return q
  return q.substring(0, 10) + len + q.substring(len - 10, len)
}
export default {
  name: 'Translatable',
  props: ['text', 'html', 'enable'],
  data: () => ({
    translated: null
  }),
  mounted () {
    this.enable && this.translate()
  },
  computed: {
    showHtml () {
      let html
      if (this.enable && this.translated) {
        html = this.translated
      } else if (this.html === '' || this.text === '') {
        return ''
      } else {
        html = this.html || this.text.split('\n').join('<br>')
      }
      return html
    }
  },
  methods: {
    translate () {
      if (this.html === '' || this.text === '') {
        return
      }
      let text
      if (this.html) {
        text = this.html.split('<br />').join('\n')
        const re = new RegExp('<[^<>]+>', 'g')
        text = text.replace(re, '')
      } else {
        text = this.text
      }
      const origins = text.split('\n')
      const youdao = common.youdao
      const salt = Math.random().toString(36).slice(-8)
      const curtime = Math.round(new Date().getTime() / 1000)
      const str1 = youdao.appKey + truncate(text) + salt + curtime + youdao.key
      const sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex)
      common.ajax({
        url: 'https://openapi.youdao.com/api',
        jsonp: `callback${Math.random().toString(36).slice(-8)}`,
        data: {
          q: text,
          appKey: youdao.appKey,
          salt: salt,
          from: 'auto',
          to: 'zh-CHS',
          sign: sign,
          signType: 'v3',
          curtime: curtime
        },
        timeout: 5000,
        success: resp => {
          if (resp.errorCode === '0') {
            let html = this.html || this.text.split('\n').join('<br>')
            const trans = resp.translation[0].split('\n')
            for (const i in trans) {
              if (trans[i] === '') continue
              html = html.replace(origins[i], trans[i])
            }
            this.translated = html
          } else {
            mdui.snackbar('翻译失败')
            console.log('translate failed')
            console.log(resp)
          }
        },
        error: reason => {
          mdui.snackbar('翻译失败')
          console.log('translate failed')
          console.log(reason)
        }
      })
    }
  },
  watch: {
    enable () {
      if (!this.translated) {
        this.translate()
      }
    }
  }
}
</script>
