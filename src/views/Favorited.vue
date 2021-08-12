<template>
  <div id="favorited-view">
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <a
          href="javascript:;"
          @click="$emit('back')"
          class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">arrow_back</i></a
        >
        <span class="mdui-typo-title">收藏/关注</span>
        <div class="mdui-toolbar-spacer"></div>
        <router-link to="/search" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">search</i></router-link
        >
        <more-vert></more-vert>
      </div>
      <div class="mdui-tab mdui-color-theme" mdui-tab>
        <a href="#favorited" class="mdui-ripple mdui-ripple-white">收藏</a>
        <a href="#followings" class="mdui-ripple mdui-ripple-white">关注</a>
      </div>
    </div>
    <div id="favorited">
      <div class="mdui-container">
        <div class="mdui-panel" mdui-panel>
          <div class="mdui-panel-item">
            <div class="mdui-panel-item-header">
              <div class="mdui-panel-item-title">
                <i class="material-icons mdui-icon">sort</i
                ><span class="panel-title">切换收藏单</span>
              </div>
              <i class="mdui-panel-item-arrow mdui-icon material-icons"
                >keyboard_arrow_down</i
              >
            </div>
            <div class="mdui-panel-item-body">
              <ul class="mdui-list">
                <li
                  class="mdui-list-item mdui-ripple"
                  v-for="list of $root.favorited"
                  :key="list.name"
                  :class="{ 'mdui-list-item-active': list.default }"
                >
                  <i class="mdui-list-item-icon mdui-icon material-icons"
                    >list</i
                  >
                  <div
                    class="mdui-list-item-content"
                    @click.self="chList(list.name)"
                  >
                    {{ list.name + (list.default ? "(当前)" : "") }}
                  </div>
                  <button
                    class="
                      mdui-btn mdui-btn-icon mdui-text-color-theme-secondary
                    "
                    mdui-dialog="{ target: '#dialog-rename-list' }"
                    @click="listNewName = listOriginName = list.name"
                  >
                    <i class="mdui-icon material-icons">edit</i>
                  </button>
                  <button
                    class="
                      mdui-btn mdui-btn-icon mdui-text-color-theme-secondary
                    "
                    @click="delList(list.name)"
                  >
                    <i class="mdui-icon material-icons">delete_forever</i>
                  </button>
                </li>
                <li
                  class="mdui-list-item mdui-ripple"
                  mdui-dialog="{ target: '#dialog-init-list' }"
                >
                  <i class="mdui-list-item-icon mdui-icon material-icons"
                    >add</i
                  >
                  <div class="mdui-list-item-content">新建收藏单</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <illust-list
          ref="illustList"
          v-if="favList"
          :ids="favList.ids"
        ></illust-list>
      </div>
    </div>
    <div id="followings">
      <div class="mdui-container">
        <user-list v-if="$root.following" :ids="$root.following"></user-list>
      </div>
    </div>
    <div class="mdui-dialog" id="dialog-init-list">
      <div class="mdui-dialog-title">新建收藏单</div>
      <div class="mdui-dialog-content">
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">名称</label>
          <input
            class="mdui-textfield-input"
            type="text"
            v-model="newListName"
          />
        </div>
      </div>
      <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" mdui-dialog-cancel>取消</button>
        <button
          class="mdui-btn mdui-ripple"
          mdui-dialog-confirm
          @click="initList"
        >
          确定
        </button>
      </div>
    </div>
    <div class="mdui-dialog" id="dialog-rename-list">
      <div class="mdui-dialog-title">重命名</div>
      <div class="mdui-dialog-content">
        <div class="mdui-textfield">
          <label class="mdui-textfield-label">名称</label>
          <input
            class="mdui-textfield-input"
            type="text"
            v-model="listNewName"
          />
        </div>
      </div>
      <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" mdui-dialog-cancel>取消</button>
        <button
          class="mdui-btn mdui-ripple"
          mdui-dialog-confirm
          @click="renameList"
        >
          确定
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import IllustList from '../components/IllustList.vue'
import MoreVert from '../components/MoreVert.vue'
import UserList from '../components/UserList.vue'
import mdui from 'mdui'
import common from '../common.vue'
const $ = mdui.$
export default {
  name: 'Favorited',
  components: {
    IllustList,
    MoreVert,
    UserList
  },
  data: () => ({
    common,
    favorited: null,
    following: null,
    newListName: '',
    listNewName: '',
    listOriginName: ''
  }),
  computed: {
    favList () { return this.$root.defaultFavList }
  },
  watch: {
    favList (newList, oldList) {
      if (oldList && newList && oldList.name !== newList.name) {
        this.$nextTick(() => {
          this.$refs.illustList.refresh()
        })
      }
    }
  },
  methods: {
    getFavorite () {
      const session = JSON.parse(localStorage.session)
      $.ajax({
        url: `${common.apiHost}/xusers/${session.name}`,
        timeout: 10000
      })
    },
    initList () {
      const name = this.newListName
      this.newListName = ''
      this.$root.getXuserData().then(() => {
        this.$root.favorited.push({
          name,
          default: false,
          ids: []
        })
        return this.$root.putXuserData()
      }).catch((err) => {
        mdui.snackbar('新建失败')
        console.log(err)
      })
    },
    renameList () {
      const newName = this.listNewName
      this.listNewName = ''
      this.$root.getXuserData().then(() => {
        const favorited = this.$root.favorited
        const list = favorited.find(list => list.name === this.listOriginName)
        if (!list) return
        list.name = newName
        return this.$root.putXuserData()
      }).catch(err => {
        mdui.snackbar('重命名失败')
        console.log(err)
      })
    },
    delList (name) {
      this.$root.getXuserData().then(() => {
        const favorited = this.$root.favorited
        const list = favorited.find(list => list.name === name)
        if (!list) return
        const index = favorited.indexOf(list)
        favorited.splice(index, 1)
        let deleted = true
        mdui.snackbar({
          message: '已删除',
          buttonText: '撤销',
          onButtonClick: () => {
            favorited.splice(index, 0, list)
            deleted = false
          },
          onClose: () => {
            if (deleted) {
              this.$root.putXuserData().catch(err => {
                mdui.snackbar('删除失败')
                console.log(err)
              })
            }
          }
        })
      }).catch(err => {
        mdui.snackbar('删除失败')
        console.log(err)
      })
    },
    chList (name) {
      this.$root.getXuserData().then(() => {
        const favorited = this.$root.favorited
        const list = favorited.find(list => list.name === name)
        const curr = favorited.find(list => list.default)
        if (!list) return
        if (curr) curr.default = false
        list.default = true
        return this.$root.putXuserData()
      }).then(() => {
        this.$refs.illustList.refresh()
      }).catch(err => {
        mdui.snackbar('切换失败')
        console.log(err)
      })
    }
  },
  activated () {
    $('body').addClass('mdui-appbar-with-tab mdui-appbar-with-toolbar')
    this.$root.getXuserData().catch(() => {})
    mdui.mutation()
  },
  deactivated () {
    $('body').removeClass('mdui-appbar-with-tab mdui-appbar-with-toolbar')
  }
}
</script>
<style lang="scss" scoped>
.mdui-panel {
  margin-top: 15px;
  .mdui-panel-item-title {
    text-overflow: clip;
    min-width: 150px;
    .panel-title {
      margin-left: 10px;
      font-weight: bold;
      transform: translateY(0.1em);
      display: inline-block;
    }
  }
}
</style>
