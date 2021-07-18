<template>
  <div class="illust-search">
    <div class="mdui-container">
      <div class="mdui-textfield">
        <input
          class="mdui-textfield-input"
          type="text"
          placeholder="搜索插图"
          v-model="query.text"
          @input="refresh"
        />
      </div>
      <illust-list ref="illustList" v-if="query.text" :query="query" :sort="sort"></illust-list>
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
    query: { text: '' },
    sort: common.IllustSort.DEFAULT
  }),
  methods: {
    refresh () {
      this.$refs.illustList && this.$refs.illustList.refresh()
    }
  }
}
</script>
