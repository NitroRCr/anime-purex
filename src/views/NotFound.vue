<template>
  <div id="not-found">
    <div class="mdui-appbar">
      <div class="mdui-toolbar mdui-color-theme">
        <back-btn
          @click="$emit('back')"
          @longpress="$emit('backhome')"
        ></back-btn>
        <span class="mdui-typo-title">NotFound</span>
        <div class="mdui-toolbar-spacer"></div>
        <router-link to="/search" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">search</i></router-link
        >
        <more-vert></more-vert>
      </div>
    </div>
    <div class="mdui-container">
      <p>
        <strong>页面没有找到... <a href="/" class="mdui-text-color-theme-accent">返回主页</a></strong>
      </p>
    </div>
  </div>
</template>
<script>
import MoreVert from '../components/MoreVert.vue'
import BackBtn from '../components/BackBtn.vue'
export default {
  name: 'NotFound',
  components: {
    MoreVert,
    BackBtn
  }
}
</script>
