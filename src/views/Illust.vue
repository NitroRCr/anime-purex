<template>
  <div id="illust-view">
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <router-link to="/" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">arrow_back</i></router-link
        >
        <a href="javascript:;" class="mdui-typo-title">{{ illust ? illust.title : '' }}</a>
        <div class="mdui-toolbar-spacer"></div>
        <router-link to="/search" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">search</i></router-link
        >
        <a href="javascript:;" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">more_vert</i></a
        >
      </div>
    </div>
    <div class="container" :class="common.screenSize">
      <div
        class="illust-container mdui-shadow-4"
        :class="common.screenSize"
        v-if="illust"
      >
        <div class="illust">
          <div class="large-image">
            <img :src="currImage" class="large-img" />
          </div>
        </div>
        <div class="illust-info">
          <div class="illust-title">
            {{ illust.title }} <favorite :illust-id="illust.id"></favorite>
            <download-image
              :urls="illust.image_urls[currp]"
              :fname-prefix="`${illust.title}_p${currp}`"
            ></download-image>
          </div>
          <div class="mdui-divider"></div>
          <image-list
            :image-urls="illust.image_urls"
            v-if="illust.image_urls.length > 1"
          ></image-list>
          <div class="illust-caption"><p v-html="illust.caption"></p></div>
          <div class="illust-tags mdui-text-color-theme">
            <a
              src="javascript:;"
              class="illust-tag"
              v-for="(tag, index) in illust.tags"
              :key="index"
              >#{{ tag }}</a
            >
          </div>
          <div class="user-info">
            <div
              class="user-avatar"
              :style="{
                backgroundImage: `url(${
                  common.apiHost + illust.user.avatar_url
                })`,
              }"
            ></div>
            <div class="user-name">{{ illust.user.name }}</div>
          </div>
        </div>
      </div>
      <page-footer></page-footer>
    </div>
  </div>
</template>
<script>
import ImageList from '../components/ImageList.vue'
import PageFooter from '../components/PageFooter.vue'
import Favorite from '../components/Favorite.vue'
import DownloadImage from '../components/DownloadImage.vue'
import mdui from 'mdui'
import common from '@/common.vue'
const $ = mdui.$
export default {
  name: 'Illust',
  components: {
    ImageList,
    PageFooter,
    Favorite,
    DownloadImage
  },
  data: () => ({
    illust: null,
    common
  }),
  mounted () {
    $('body').addClass('mdui-appbar-with-toolbar')
    this.getIllust()
  },
  beforeDestroy () {
    $('body').removeClass('mdui-appbar-with-toolbar')
  },
  methods: {
    getIllust () {
      const id = this.$route.params.id
      if (common.cachedIllusts[id]) {
        this.illust = common.cachedIllusts[id]
        return
      }
      $.ajax({
        url: common.apiHost + '/illusts/' + id,
        dataType: 'json',
        timeout: 10000,
        success: (illust) => {
          this.illust = illust
          common.cachedIllusts[id] = illust
        },
        error: (jqXHR, textStatus, errorThrown) => {
          mdui.snackbar(`插画获取失败: ${textStatus}`)
        }
      })
    }
  },
  computed: {
    currImage () {
      if (!this.illust) return null
      const urls = this.illust.image_urls[this.currp]
      return common.getImageUrl(urls, 'large')
    },
    currp () {
      if (this.illust.image_urls[this.$route.query.p]) {
        return this.$route.query.p
      } else return 0
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  margin: auto;
  &.xs {
    margin-top: 0;
  }
  &.sm {
    width: 85%;
  }
  &.md {
    width: 75%;
  }
  &.lg {
    width: 60%;
  }
  &.xl {
    width: 50%;
  }
}
.illust-container {
  display: flex;
  margin-top: 20px;
  &.xs {
    margin-top: 0;
  }
  &.xs,
  &.sm {
    flex-direction: column;
    .illust {
      width: 100%;
    }
  }
  &.md,
  &.lg,
  &.xl {
    flex-direction: row;
    .illust {
      border-right: rgba(0, 0, 0, 0.12) 1px solid;
    }
    .illust-info {
      width: calc(200px + 20vw);
    }
  }
  .illust {
    .large-image {
      img {
        width: 100%;
        display: block;
      }
    }
  }
  .illust-info {
    padding: 5px 10px;
    text-align-last: left;
    .illust-title {
      height: 36px;
      font-weight: bold;
      font-size: 18px;
      line-height: 2;
      margin-bottom: 5px;
      .download-image,
      .favorite-btn {
        float: right;
      }
    }
    .illust-tags {
      margin: 10px 5px;
      .illust-tag {
        text-decoration: none;
        display: inline-block;
        margin-right: 8px;
        margin-bottom: 5px;
      }
    }
    .user-info {
      height: 30px;
      margin: 5px;
      text-align: left;
      display: flex;
      align-items: center;
      .user-avatar {
        height: 30px;
        width: 30px;
        background-size: cover;
        background-position: center;
        border-radius: 50%;
      }
      .user-name {
        margin-top: 2px;
        font-size: 18px;
        font-weight: bold;
        line-height: 1.15;
        display: inline-block;
        margin-left: 8px;
      }
    }
  }
}
</style>
