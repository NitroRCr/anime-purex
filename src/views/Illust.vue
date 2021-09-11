<template>
  <div id="illust-view">
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <back-btn
          @click="$emit('back')"
          @longpress="$emit('backhome')"
        ></back-btn>
        <span class="mdui-typo-title">{{ illust ? illust.title : "" }}</span>
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
        :class="[common.screenSize, { 'dual-col': ifDualCol }]"
        v-if="illust"
      >
        <div class="illust">
          <div class="large-image">
            <img
              :src="currImage"
              :style="imgScaleStyle"
              v-show="!$root.settings.anime4k || !largeLoaded"
              class="large-img"
            />
            <canvas
              :style="imgScaleStyle"
              v-show="$root.settings.anime4k && largeLoaded"
              class="image-scaler"
            ></canvas>
          </div>
        </div>
        <div class="illust-info">
          <div class="illust-title">
            <favorite :illust="illust"></favorite>
            <download-image
              :urls="illust.image_urls"
              :title="illust.title"
              :currIndex="currp"
            ></download-image>
            <span
              ><translatable
                :text="illust.title"
                :enable="enableTranslate"
              ></translatable
            ></span>
            <origin-url :illust="illust"></origin-url>
          </div>
          <div class="mdui-divider"></div>
          <image-list
            :image-urls="illust.image_urls"
            v-if="illust.image_urls.length > 1"
            @click="changeImage"
          ></image-list>
          <div class="mdui-divider" v-if="illust.image_urls.length === 2"></div>
          <div class="illust-control">
            <div class="control-name">放大</div>
            <label class="mdui-slider scale-control">
              <input
                type="range"
                step="0.1"
                min="0"
                max="100"
                v-model="inputScale"
              />
            </label>
            <div class="control-name">机翻</div>
            <label class="mdui-switch">
              <input type="checkbox" v-model="enableTranslate" />
              <i class="mdui-switch-icon"></i>
            </label>
          </div>
          <div class="mdui-divider" v-if="illust.image_urls.length > 1"></div>
          <div class="illust-caption mdui-text-color-text mdui-typo">
            <translatable
              :html="illust.caption"
              :enable="enableTranslate"
            ></translatable>
          </div>
          <div class="illust-tags mdui-typo">
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
          <user-image-list
            :userId="illust.user.id"
            @click="loadIllust"
          ></user-image-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ImageList from '../components/ImageList.vue'
import Favorite from '../components/Favorite.vue'
import DownloadImage from '../components/DownloadImage.vue'
import MoreVert from '../components/MoreVert.vue'
import UserBrief from '../components/UserBrief.vue'
import OriginUrl from '../components/OriginUrl.vue'
import Translatable from '../components/Translatable.vue'
import UserImageList from '../components/UserImageList.vue'
import BackBtn from '../components/BackBtn.vue'
import mdui from 'mdui'
import common from '@/common.vue'
import Anime4K from 'anime4k'
const $ = mdui.$
export default {
  name: 'Illust',
  components: {
    ImageList,
    Favorite,
    DownloadImage,
    MoreVert,
    UserBrief,
    OriginUrl,
    Translatable,
    UserImageList,
    BackBtn
  },
  data: () => ({
    illust: null,
    largeLoaded: false,
    common,
    currp: 0,
    inputScale: 0,
    enableTranslate: false,
    lastId: null
  }),
  mounted () {
    $('body').addClass('mdui-appbar-with-toolbar')
    this.loadIllust()
  },
  beforeDestroy () {
    $('body').removeClass('mdui-appbar-with-toolbar')
  },
  methods: {
    loadIllust () {
      return this.getIllust({
        id: this.$route.params?.id,
        pixivId: this.$route.query?.pixiv_id
      }).then((illust) => {
        this.illust = illust
        common.cachedIllusts[illust.id] = illust
        common.cachedUsers[illust.user.id] = illust.user
        this.changeImage(0)
        this.$nextTick(() => {
          mdui.mutation()
          this.setCaptionLink()
        })
      }).catch(err => {
        if (err.message === '404') {
          const pixivId = this.$route.query.pixiv_id
          if (pixivId) window.open(`https://www.pixiv.net/artworks/${pixivId}`, '_blank')
          else this.$router.replace('/404')
        } else if (err.message === '400') {
          this.$router.replace('/404')
        } else {
          console.log(err)
        }
      })
    },
    getIllust ({ id, pixivId }) {
      return new Promise((resolve, reject) => {
        if (id) {
          if (common.cachedIllusts[id]) {
            resolve(common.cachedIllusts[id])
          } else {
            $.ajax({
              url: common.apiHost + '/illusts/' + id,
              dataType: 'json',
              timeout: 10000,
              success: (illust) => { resolve(illust) },
              error: (jqXHR, textStatus, errorThrown) => {
                if (jqXHR.status === 404) {
                  reject(Error('404'))
                } else {
                  mdui.snackbar(`插画获取失败: ${textStatus}`)
                  reject(errorThrown)
                }
              }
            })
          }
        } else if (pixivId) {
          $.ajax({
            url: common.apiHost + '/illusts',
            data: {
              search: JSON.stringify({
                query: { pixiv_id: pixivId }
              })
            },
            timeout: 10000,
            dataType: 'json',
            success: ([illust]) => {
              if (illust) resolve(illust)
              else {
                reject(Error('404'))
              }
            },
            error: (jqXHR, textStatus, errorThrown) => {
              reject(errorThrown)
            }
          })
        } else {
          reject(Error('400'))
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
      img.crossOrigin = ''
      const urls = this.illust.image_urls[this.currp]
      img.onload = () => {
        if (this.$root.settings.anime4k) {
          setTimeout(() => {
            const scaler = Anime4K.Scaler($('canvas.image-scaler')[0].getContext('webgl'))
            scaler.inputImage(img)
            scaler.resize(2.0, {})
            this.largeLoaded = true
          }, 250)
        } else {
          this.largeLoaded = true
        }
      }
      img.src = common.getImageUrl(urls, 'large')
    },
    setCaptionLink () {
      $('.illust-caption a[href^="pixiv"]').on('click', event => {
        const matched = event.target.href.match(/^pixiv:\/\/illusts\/(\d+)$/)
        if (matched) {
          event.preventDefault()
          this.$router.push(`/illusts/?pixiv_id=${matched[1]}`)
        }
      })
    },
    upscale (event) {
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
    },
    imgScaleStyle () {
      const maxScale = 3
      return {
        transform: `scale(${maxScale ** (this.inputScale / 100)})`
      }
    },
    ifDualCol () {
      let aspectRadio = this.illust.aspectRadio
      if (!aspectRadio) {
        aspectRadio = 9 / 16
      }
      switch (this.common.screenSize) {
        case 'xs':
        case 'sm':
          return false
        case 'md':
        case 'lg':
        case 'xl':
          if (aspectRadio >= 4 / 3) return false
          else return true
        default:
          return true
      }
    }
  },
  watch: {
    $route (to, from) {
      const id = to.params.id || to.query.pixiv_id
      if (id && id !== this.lastId) {
        this.loadIllust()
        this.lastId = id
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  margin: 20px auto;
  &.xs {
    margin: 0;
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
  &.xs {
    margin-top: 0;
  }
  &.xs,
  &:not(.dual-col) {
    flex-direction: column;
    .illust {
      width: 100%;
    }
  }
  &:not(.xs) {
    border-radius: 3px;
    overflow: hidden;
  }
  &.dual-col {
    flex-direction: row;
    .illust {
      border-right: rgba(0, 0, 0, 0.12) 1px solid;
      flex-grow: 1;
    }
    .illust-info {
      width: calc(100px + 20vw);
      flex-shrink: 0;
    }
  }
  .illust {
    .large-image {
      overflow: auto;
      img,
      canvas {
        width: 100%;
        display: block;
        transform-origin: top left;
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
    .illust-control {
      display: flex;
      align-items: center;
      margin: 5px;
      .control-name {
        font-weight: bold;
        flex-shrink: 0;
        margin-right: 10px;
      }
      .scale-control {
        margin-right: 20px;
      }
      .mdui-switch {
        padding-right: 5px;
      }
    }
    .illust-caption {
      margin: 14px 5px;
      word-break: break-word;
      line-height: 1.5;
    }
    .illust-tags {
      margin: 10px 5px;
      line-height: 1.5;
      .illust-tag {
        text-decoration: none;
        display: inline-block;
        margin-right: 8px;
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
