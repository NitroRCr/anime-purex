<template>
  <div id="illust-view">
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <a
          href="javascript:;"
          @click="$router.back()"
          class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">arrow_back</i></a
        >
        <a href="javascript:;" class="mdui-typo-title">{{
          illust ? illust.title : ""
        }}</a>
        <div class="mdui-toolbar-spacer"></div>
        <router-link to="/search" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">search</i></router-link
        >
        <more-vert></more-vert>
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
            <favorite :illust="illust"></favorite>
            <download-image
              :urls="illust.image_urls[currp]"
              :fname-prefix="`${illust.title}_p${currp}`"
            ></download-image>
            <span>{{ illust.title }}</span>
            <origin-url :illust="illust"></origin-url>
          </div>
          <div class="mdui-divider"></div>
          <image-list
            :image-urls="illust.image_urls"
            v-if="illust.image_urls.length > 1"
            @click="changeImage"
          ></image-list>
          <div
            class="illust-caption mdui-text-color-text"
            v-html="illust.caption"
          ></div>
          <div class="illust-tags mdui-text-color-theme">
            <router-link
              :to="`/tags/${tag}`"
              class="illust-tag"
              v-for="(tag, index) in illust.tags"
              :key="index"
              >#{{ tag }}</router-link
            >
          </div>
          <div class="illust-other-info mdui-text-color-theme-secondary">
            <span class="info-item"
              ><i class="material-icons mdui-icon">date_range</i>&nbsp;{{
                publishDate
              }}</span
            >
            <span class="info-item"
              ><i class="material-icons mdui-icon">favorite</i>&nbsp;{{
                illust.likes
              }}</span
            >
          </div>
          <user-brief :user="illust.user"></user-brief>
        </div>
      </div>
    </div>
    <div style="height: 30px"></div>
  </div>
</template>
<script>
import ImageList from '../components/ImageList.vue'
import Favorite from '../components/Favorite.vue'
import DownloadImage from '../components/DownloadImage.vue'
import MoreVert from '../components/MoreVert.vue'
import UserBrief from '../components/UserBrief.vue'
import OriginUrl from '../components/OriginUrl.vue'
import mdui from 'mdui'
import common from '@/common.vue'
const $ = mdui.$
export default {
  name: 'Illust',
  components: {
    ImageList,
    Favorite,
    DownloadImage,
    MoreVert,
    UserBrief,
    OriginUrl
  },
  data: () => ({
    illust: null,
    largeLoaded: false,
    common,
    currp: 0
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
        this.loadLarge()
        return
      }
      $.ajax({
        url: common.apiHost + '/illusts/' + id,
        dataType: 'json',
        timeout: 10000,
        success: (illust) => {
          this.illust = illust
          common.cachedIllusts[id] = illust
          common.cachedUsers[illust.user.id] = illust.user
          this.loadLarge()
        },
        error: (jqXHR, textStatus, errorThrown) => {
          mdui.snackbar(`插画获取失败: ${textStatus}`)
        }
      })
    },
    changeImage (index) {
      this.currp = index
      this.largeLoaded = false
      this.loadLarge()
    },
    loadLarge () {
      const img = new Image()
      const urls = this.illust.image_urls[this.currp]
      img.onload = () => {
        this.largeLoaded = true
      }
      img.src = common.getImageUrl(urls, 'large')
    }
  },
  computed: {
    currImage () {
      if (!this.illust) return null
      const urls = this.illust.image_urls[this.currp]
      if (this.largeLoaded) return common.getImageUrl(urls, 'large')
      else return common.getImageUrl(urls, 'medium')
    },
    publishDate () {
      const date = new Date(this.illust.publish_time * 1e3)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
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
    .illust-title {
      min-height: 36px;
      font-weight: bold;
      font-size: 18px;
      line-height: 2;
      margin-bottom: 5px;
      .download-image,
      .favorite-btn {
        float: right;
      }
    }
    .illust-caption {
      margin: 14px 0;
      a {
        display: inline-block;
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
    .illust-other-info {
      margin: 10px 5px;
      .info-item {
        display: inline-block;
        margin-right: 10px;
        .mdui-icon {
          font-size: 1em;
          transform: translateY(-0.1em);
        }
      }
    }
  }
}
</style>
