<template>
  <div class="image-list">
    <a
      href="javascript:;"
      @click="$emit('click', index)"
      class="image-item mdui-hoverable mdui-ripple"
      v-for="(urls, index) in this.imageUrls"
      :key="index"
      :style="{ backgroundImage: `url(${common.getImageUrl(urls, 'medium')})` }"
    ></a>
  </div>
</template>
<script>
import common from '@/common.vue'
export default {
  name: 'ImageList',
  props: ['imageUrls'],
  data: () => ({
    common
  })
}
</script>
<style lang="scss" scoped>
.image-list {
  display: flex;
  width: calc(100% - 10px);
  overflow-x: auto;
  padding: 10px 5px;
  .image-item {
    flex-shrink: 0;
    display: block;
    background-size: cover;
    background-position: center;
    height: 100px;
    width: 100px;
    margin: 5px;
    border-radius: 5%;
  }
}
</style>
