<template>
  <div id="settings-view">
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <back-btn
          @click="$emit('back')"
          @longpress="$emit('backhome')"
        ></back-btn>
        <span class="mdui-typo-title">设置</span>
        <div class="mdui-toolbar-spacer"></div>
        <router-link to="/search" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">search</i></router-link
        >
        <more-vert ref="moreVert"></more-vert>
      </div>
    </div>
    <div class="mdui-container">
      <ul class="mdui-list">
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">color_lens</i>
          <a
            href="javascript:;"
            class="mdui-list-item-content"
            mdui-dialog="{target: '#dialog-theme'}"
            >设置主题</a
          >
        </li>
        <div class="mdui-divider"></div>
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">high_quality</i>
          <div class="mdui-list-item-content">Anime4K - 画质提升</div>
          <label class="mdui-switch">
            <input type="checkbox" v-model="settings.anime4k" />
            <i class="mdui-switch-icon"></i>
          </label>
        </li>
        <div class="mdui-divider"></div>
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">arrow_back</i>
          <div class="mdui-list-item-content">长按左上角返回主页</div>
          <label class="mdui-switch">
            <input type="checkbox" v-model="settings.longPressToHome" />
            <i class="mdui-switch-icon"></i>
          </label>
        </li>
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">short_text</i>
          <div class="mdui-list-item-content">收藏作品后提示</div>
          <label class="mdui-switch">
            <input type="checkbox" v-model="settings.favoriteToast" />
            <i class="mdui-switch-icon"></i>
          </label>
        </li>
        <div class="mdui-divider"></div>
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">restore</i>
          <a
            href="javascript:;"
            class="mdui-list-item-content"
            mdui-dialog="{ target: '#clear-all-dialog' }"
            >清除所有本地数据</a
          >
        </li>
      </ul>
    </div>
    <div class="mdui-dialog" id="clear-all-dialog">
      <div class="mdui-dialog-title">确定继续？</div>
      <div class="mdui-dialog-content">设置数据、收藏的标签将会被删除</div>
      <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" mdui-dialog-cancel>取消</button>
        <button
          class="mdui-btn mdui-ripple"
          @click="clearAll"
        >
          确定
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import MoreVert from '../components/MoreVert.vue'
import BackBtn from '../components/BackBtn.vue'
import mdui from 'mdui'
const $ = mdui.$
export default {
  name: 'Settings',
  components: {
    MoreVert,
    BackBtn
  },
  data () {
    return {
      settings: this.$root.settings
    }
  },
  methods: {
    clearAll () {
      localStorage.clear()
      window.location.href = '/'
    }
  },
  mounted () {
    $('body').addClass('mdui-appbar-with-toolbar')
  },
  beforeDestroy () {
    $('body').removeClass('mdui-appbar-with-toolbar')
  }
}
</script>
