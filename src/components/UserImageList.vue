<template>
  <image-list v-if="illusts.length > 1" :imageUrls="imageUrls" @click="goIllust"></image-list>
</template>
<script>
import ImageList from './ImageList.vue'
import common from '@/common'
import mdui from 'mdui'
const $ = mdui.$
export default {
  name: 'UserImageList',
  props: ['userId'],
  components: {
    ImageList
  },
  data: () => ({
    illusts: []
  }),
  mounted () {
    this.getIllusts()
  },
  methods: {
    getIllusts () {
      $.ajax({
        url: `${common.apiHost}/illusts`,
        data: {
          search: JSON.stringify({
            query: { user: this.userId },
            sort: common.IllustSort.LIKES,
            limit: 10
          })
        },
        dataType: 'json',
        timeout: 10000
      }).then(illusts => {
        this.illusts = illusts
        for (const illust of illusts) {
          common.cachedIllusts[illust.id] = illust
          common.cachedUsers[illust.user.id] = illust.user
          common.getMediumImage(illust)
        }
      }).catch(err => {
        console.log(err)
        mdui.snackbar('插画获取失败')
      })
    },
    goIllust (index) {
      this.$router.push(`/illusts/${this.illusts[index].id}`).catch(() => {})
      document.body.scrollIntoView({ behavior: 'smooth' })
    }
  },
  computed: {
    imageUrls () {
      const urls = []
      for (const illust of this.illusts) {
        urls.push(illust.image_urls[0])
      }
      return urls
    }
  },
  watch: {
    userId () {
      this.getIllusts()
    }
  }
}
</script>
