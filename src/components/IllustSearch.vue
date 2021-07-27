<template>
  <div class="illust-search">
    <div class="mdui-container">
      <div class="mdui-textfield">
        <input
          class="mdui-textfield-input"
          type="text"
          placeholder="搜索插图"
          v-model="searchText"
        />
      </div>
      <illust-list ref="illustList" v-if="searchText" :text="searchText" :originSort="sort"></illust-list>
    </div>
  </div>
</template>
<script>
import IllustList from './IllustList.vue'
import common from '@/common.vue'
export default {
  name: 'IllustSearch',
  components: {
    IllustList
  },
  data: () => ({
    searchText: '',
    sort: common.IllustSort.DEFAULT
  })
}
</script>
