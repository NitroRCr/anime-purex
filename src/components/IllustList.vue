<template>
  <div class="illust-list-container">
    <div class="illust-list">
      <router-link
        :to="`/illusts/${illust.id}`"
        class="illust"
        v-for="(illust, index) in illusts"
        :key="index"
        :style="illustStyle"
      >
        <div
          class="image mdui-hoverable"
          :style="{
            backgroundImage: `url(${common.getImageUrl(
              illust.image_urls[0],
              'medium'
            )})`,
          }"
        ></div>
        <div class="illust-info">
          <div class="illust-title">{{ illust.title }}</div>
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
      </router-link>
    </div>
    <illust-loader @load="getIllusts" v-if="!noMore"></illust-loader>
    <div class="no-more" v-if="noMore">没有更多了...</div>
  </div>
</template>
<script>
import IllustLoader from './IllustLoader.vue'
import common from '@/common'
import mdui from 'mdui'
const $ = mdui.$
export default {
  name: 'IllustList',
  props: ['query', 'sort'],
  components: {
    IllustLoader
  },
  data: () => ({
    offset: 0,
    illusts: [],
    waiting: false,
    common,
    xhr: null,
    noMore: false,
    preventErr: false
  }),
  methods: {
    getIllusts () {
      if (this.waiting || this.noMore) {
        return
      }
      this.waiting = true
      $.ajax({
        url: common.apiHost + '/illusts',
        data: {
          search: JSON.stringify({
            limit: 20,
            offset: this.offset,
            sort: this.sort,
            query: this.query
          })
        },
        dataType: 'json',
        timeout: 10000,
        beforeSend: (xhr) => {
          this.xhr = xhr
        },
        success: (illusts) => {
          this.illusts = this.illusts.concat(illusts)
          this.offset += illusts.length
          this.waiting = false
          this.xhr = null
          for (const illust of illusts) {
            common.cachedIllusts[illust.id] = illust
          }
          if (illusts.length === 0) {
            this.noMore = true
          }
        },
        error: (jqXHR, textStatus, errorThrown) => {
          if (this.preventErr) return
          mdui.snackbar(`插画获取失败: ${textStatus}`, { timeout: 2000 })
          this.xhr = null
          setTimeout(() => {
            this.waiting = false
          }, 3000)
        }
      }).catch((error) => {
        if (!this.preventErr) throw error
      })
    },
    refresh () {
      this.illusts = []
      this.offset = 0
      if (this.xhr) {
        this.preventErr = true
        this.xhr.abort()
        setTimeout(() => {
          this.preventErr = false
        }, 0)
      }
      this.waiting = false
      this.noMore = false
      this.getIllusts()
    }
  },
  computed: {
    illustStyle () {
      let cols
      switch (common.screenSize) {
        case 'xs':
          cols = 2
          break
        case 'sm':
          cols = 3
          break
        case 'md':
          cols = 4
          break
        case 'lg':
          cols = 5
          break
        case 'xl':
          cols = 7
          break
      }
      return {
        width: `calc(${Math.round(100 / cols)}% - 10px)`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.illust-list {
  display: flex;
  flex-wrap: wrap;
  .illust {
    display: block;
    color: rgba(0, 0, 0, 0.87);
    text-decoration: none;
    margin: 5px;
    .image {
      width: 100%;
      padding-bottom: 100%;
      height: 0;
      background-size: cover;
      background-position: center;
      border-radius: 5%;
    }
    .illust-info {
      .illust-title,
      .user-name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .illust-title {
        font-size: 18px;
        text-align: left;
        line-height: 1;
        font-weight: bold;
        margin: 5px;
      }
      .user-info {
        height: 20px;
        margin: 5px;
        text-align: left;
        display: flex;
        align-items: center;
        .user-avatar {
          height: 20px;
          width: 20px;
          background-size: cover;
          background-position: center;
          border-radius: 50%;
        }
        .user-name {
          margin-top: 2px;
          font-size: 15px;
          line-height: 1.15;
          display: inline-block;
          margin-left: 5px;
          color: rgba(0, 0, 0, 0.54);
        }
      }
    }
  }
}
.no-more {
  margin: 10px;
  font-weight: bold;
  text-align: center;
}
</style>
