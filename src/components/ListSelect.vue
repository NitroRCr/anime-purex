<template>
  <div class="mdui-dialog" id="dialog-select-list">
    <div class="mdui-dialog-title">选择一个收藏单</div>
    <div class="mdui-dialog-content">
      <ul class="mdui-list">
        <li
          class="mdui-list-item"
          v-for="(list, index) in $root.favorited"
          :key="index"
        >
          <i class="mdui-list-item-icon mdui-icon material-icons">list</i>
          <div class="mdui-list-item-content" @click="$root.setList(list.name)">
            {{ list.name }}
          </div>
          <div class="mdui-chip" v-if="list.default">
            <span class="mdui-chip-title">默认</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="mdui-dialog-actions">
      <button class="mdui-btn mdui-ripple">取消</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ListSelect'
}
</script>
