<template>
  <div class="user-search">
    <div class="mdui-container">
      <div class="mdui-textfield">
        <input
          class="mdui-textfield-input"
          type="text"
          placeholder="搜索画师"
          v-model="searchText"
        />
      </div>
      <user-list v-if="searchText" :text="searchText"></user-list>
    </div>
  </div>
</template>
<script>
import UserList from './UserList.vue'
export default {
  name: 'UserSearch',
  components: {
    UserList
  },
  data: () => ({
    searchText: ''
  })
}
</script>
