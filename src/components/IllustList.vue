<template>
  <div class="illust-list-container">
    <div class="mdui-panel" v-if="!favList" mdui-panel>
      <div class="mdui-panel-item">
        <div class="mdui-panel-item-header">
          <div class="mdui-panel-item-title">
            <i class="material-icons mdui-icon">sort</i
            ><span class="panel-title">选项</span>
          </div>
          <i class="mdui-panel-item-arrow mdui-icon material-icons"
            >keyboard_arrow_down</i
          >
        </div>
        <div class="mdui-panel-item-body">
          <div class="sort-select">
            <div class="panel-sub-title">排列顺序</div>
            <div class="select-container">
              <select
                class="mdui-select"
                mdui-select="{ position: 'bottom' }"
                v-model="sort"
              >
                <option :value="common.IllustSort.RANDOM">随机</option>
                <option :value="common.IllustSort.DEFAULT">最相关</option>
                <option :value="common.IllustSort.LIKES">最热门</option>
                <option :value="common.IllustSort.TIME">最新</option>
              </select>
            </div>
          </div>
          <div class="type-select">
            <div class="panel-sub-title">类型</div>
            <div class="select-container">
              <select class="mdui-select" mdui-select v-model="type">
                <option :value="null">不限</option>
                <option value="illust">插画</option>
                <option value="manga">漫画</option>
              </select>
            </div>
          </div>
          <!-- Disable R-18 -->
          <div class="age-select" v-if="false">
            <div class="panel-sub-title">年龄限制</div>
            <div class="select-container">
              <select class="mdui-select" mdui-select v-model="ageLimit">
                <option :value="null">不限</option>
                <option :value="common.AgeLimit.ALL_AGE">全年龄</option>
                <option :value="common.AgeLimit.R_18">R-18</option>
              </select>
            </div>
          </div>
          <div class="eval-select">
            <div class="panel-sub-title">风格过滤</div>
            <ul class="mdui-list">
              <li
                class="mdui-list-item mdui-ripple"
                v-for="evaluator of allEvals"
                :key="evaluator.name"
              >
                <i class="mdui-list-item-icon mdui-icon material-icons">{{
                  evaluator.icon || "style"
                }}</i>
                <div class="mdui-list-item-content">
                  {{ evaluator.showName }}
                </div>
                <label class="mdui-switch">
                  <input
                    type="checkbox"
                    :value="evaluator.name"
                    v-model="evaluators"
                  />
                  <i class="mdui-switch-icon"></i>
                </label>
              </li>
            </ul>
          </div>
          <div class="tag-select">
            <div class="panel-sub-title">标签过滤</div>
            <ul class="mdui-list">
              <li class="mdui-list-item" v-if="collectedTags.length === 0">
                你还没有收藏的标签哦
              </li>
              <li
                class="mdui-list-item"
                v-for="tag of collectedTags"
                :key="tag"
              >
                <collect class="mdui-list-item-icon" :tag="tag"></collect>
                <div class="mdui-list-item-content">
                  {{ tag }}
                </div>
                <label class="mdui-switch">
                  <input type="checkbox" :value="tag" v-model="inputTags" />
                  <i class="mdui-switch-icon"></i>
                </label>
              </li>
            </ul>
          </div>
          <div class="likes-range">
            <div class="panel-sub-title">收藏数限制</div>
            <div class="panel-range-container">
              <label class="mdui-slider">
                <input v-model="likesRange" type="range" step="0.05" min="0" max="1" />
              </label>
              <div class="min-likes">{{ minLikes ? '≥' + minLikes : '不限' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="illust-list">
      <div
        class="illust mdui-text-color-theme-text"
        v-for="(illust, index) in illusts"
        :key="index"
        :style="illustStyle"
      >
        <div
          @click.self="$router.push(`/illusts/${illust.id}`)"
          class="image mdui-hoverable"
          :style="{
            backgroundImage: `url(${common.getMediumImage(illust)})`,
          }"
        >
          <div class="image-num" v-if="illust.image_urls.length > 1">
            {{ illust.image_urls.length }}
          </div>
          <favorite :illust="illust" :originFavList="favList"></favorite>
        </div>
        <div class="illust-info">
          <div class="illust-title">{{ illust.title }}</div>
          <router-link class="user-info" :to="`/users/${illust.user.id}`">
            <div
              class="user-avatar"
              :style="{
                backgroundImage: `url(${
                  common.apiHost + illust.user.avatar_url
                })`,
              }"
            ></div>
            <div class="user-name mdui-text-color-theme-secondary">
              {{ illust.user.name }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <illust-loader @load="getIllusts" v-if="!noMore"></illust-loader>
    <div class="no-more" v-if="noMore">没有更多了...</div>
  </div>
</template>
<script>
import IllustLoader from './IllustLoader.vue'
import Favorite from './Favorite.vue'
import Collect from './Collect.vue'
import common from '@/common'
import mdui from 'mdui'
const $ = mdui.$
export default {
  name: 'IllustList',
  props: {
    text: { default: '' },
    presetTag: { default: null },
    originEvals: { default: () => [] },
    originSort: { default: common.IllustSort.DEFAULT },
    originAgeLimit: { default: common.AgeLimit.ALL_AGE },
    originType: { default: null },
    user: { default: null },
    favList: { default: null }
  },
  components: {
    IllustLoader,
    Favorite,
    Collect
  },
  mounted () {
    mdui.mutation()
  },
  activated () {
    this.collectedTags = JSON.parse(localStorage.collectedTags)
  },
  data () {
    return {
      offset: 0,
      illusts: [],
      waiting: false,
      common,
      xhr: null,
      noMore: false,
      preventErr: false,
      allEvals: common.evaluators,
      inputTags: [],
      collectedTags: JSON.parse(localStorage.collectedTags),
      sort: this.originSort,
      ageLimit: this.originAgeLimit,
      evaluators: this.originEvals,
      type: this.originType,
      limit: 20,
      likesRange: 0
    }
  },
  methods: {
    getIllusts () {
      if (this.waiting || this.noMore) {
        return
      }
      this.waiting = true
      const search = JSON.stringify(
        this.favList
          ? {
            ids: this.favList.ids
              .slice()
              .reverse()
              .slice(
                this.offset,
                this.offset + this.limit
              )
          }
          : {
            limit: this.limit,
            offset: this.offset,
            sort: this.sort,
            query: this.query
          }
      )
      $.ajax({
        url: common.apiHost + '/illusts',
        data: {
          search
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
            common.cachedUsers[illust.user.id] = illust.user
          }
          if (illusts.length < this.limit) {
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
      this.illusts.length = 0
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
          cols = 6
          break
      }
      return {
        width: `calc(${(100 / cols).toFixed(2)}% - 10px)`
      }
    },
    query () {
      const query = {}
      if (this.text) {
        query.text = this.text
      }
      if (this.inputTags) {
        const tags = Array.from(this.inputTags)
        if (this.presetTag && tags.indexOf(this.presetTag) === -1) {
          tags.push(this.presetTag)
        }
        query.tags = tags
      }
      if (this.evaluators) {
        query.passed_evals = this.evaluators
      }
      query.sort = this.sort
      if (this.ageLimit != null) {
        query.age_limit = this.ageLimit
      }
      if (this.type != null) {
        query.type = this.type
      }
      if (this.user != null) {
        query.user = this.user
      }
      if (this.likesRange) {
        query.min_likes = this.minLikes
      }
      return query
    },
    minLikes () {
      const range = parseFloat(this.likesRange)
      if (!range) return 0
      return Math.round(50 ** range * 4) * 100
    }
  },
  watch: {
    query () {
      this.refresh()
    }
  }
}
</script>
<style lang="scss" scoped>
.mdui-panel {
  margin-top: 15px;
  .panel-sub-title {
    margin-top: 5px;
    font-weight: bold;
  }
  .select-container {
    padding: 10px 16px;
  }
  .panel-range-container {
    padding: 10px 16px;
    display: flex;
    align-items: center;
    .min-likes {
      flex-shrink: 0;
      margin-left: 16px;
    }
  }
  .panel-title {
    margin-left: 10px;
    font-weight: bold;
    transform: translateY(0.1em);
    display: inline-block;
  }
}
.illust-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  .illust {
    display: block;
    text-decoration: none;
    margin: 5px;
    .image {
      width: 100%;
      padding-bottom: 100%;
      height: 0;
      background-size: cover;
      background-position: center;
      border-radius: 10px;
      position: relative;
      .image-num {
        position: absolute;
        top: 5px;
        right: 5px;
        border-radius: 10px;
        background-color: rgba(#000, 0.25);
        padding: 3px 5px;
        color: white;
        font-weight: bold;
      }
      .favorite-btn {
        color: white;
        position: absolute;
        bottom: 0;
        right: 0;
      }
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
        padding: 5px;
      }
      .user-info {
        height: 20px;
        margin: 5px;
        text-align: left;
        display: flex;
        align-items: center;
        text-decoration: none;
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
