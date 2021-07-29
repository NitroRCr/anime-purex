<template>
  <span class="translatable" v-html="showHtml"></span>
</template>
<script>
import common from '@/common.vue'
import mdui from 'mdui'
const $ = mdui.$
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
      $.ajax({
        url: common.apiHost + '/translate',
        data: {
          doctype: 'json',
          type: 'JA2ZH_CN',
          i: text
        },
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded;',
        timeout: 5000
      }).then(resp => {
        if (resp.errorCode === 0) {
          let html = this.html || this.text.split('\n').join('<br>')
          for (const result of resp.translateResult) {
            for (const trans of result) {
              html = html.replace(trans.src, trans.tgt)
            }
          }
          this.translated = html
        } else {
          mdui.snackbar('翻译失败')
          console.log('translate failed')
          console.log(resp)
        }
      }).catch(reason => {
        mdui.snackbar('翻译失败')
        console.log('translate failed')
        console.log(reason)
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
