<template>
  <div id="login">
    <page-background></page-background>
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <a
          href="javascript:;"
          @click="$emit('back')"
          class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">arrow_back</i></a
        >
        <span class="mdui-typo-title">{{
          mode === "login" ? "登录" : "注册"
        }}</span>
        <div class="mdui-toolbar-spacer"></div>
        <router-link to="/search" class="mdui-btn mdui-btn-icon"
          ><i class="mdui-icon material-icons">search</i></router-link
        >
        <more-vert></more-vert>
      </div>
    </div>
    <div class="page-content">
      <div class="mdui-container">
        <div class="login-paper mdui-shadow-3">
          <div class="logo-img">
            <img src="/img/icons/px-maskable-150x150.png" />
          </div>
          <div class="login-title">
            {{ mode === "login" ? "登录 PureX" : "注册 PureX" }}
          </div>
          <form @submit.prevent="submit">
            <div class="mdui-textfield mdui-textfield-floating-label">
              <label class="mdui-textfield-label">用户名</label>
              <input
                class="mdui-textfield-input"
                type="text"
                required
                pattern=".{1,16}"
                v-model="form.name"
              />
              <div class="mdui-textfield-error">用户名长度为1~16</div>
            </div>

            <div class="mdui-textfield mdui-textfield-floating-label">
              <label class="mdui-textfield-label">密码</label>
              <input
                class="mdui-textfield-input"
                type="password"
                pattern="^.*(?=.{6,})(?=.*[A-z]).*$"
                required
                v-model="form.password"
              />
              <div class="mdui-textfield-error">密码至少 6 位，且包含字母</div>
            </div>
            <div
              v-if="mode === 'register'"
              class="mdui-textfield mdui-textfield-floating-label"
            >
              <label class="mdui-textfield-label">确认密码</label>
              <input
                class="mdui-textfield-input"
                type="password"
                required
                v-model="form.confirm"
              />
              <div class="mdui-textfield-error">请再次输入密码</div>
            </div>
            <button
              type="submit"
              class="
                mdui-btn-raised
                mdui-btn
                mdui-btn-block
                mdui-color-theme-accent
                mdui-ripple
              "
              :disabled="waiting"
            >
              {{ mode === "login" ? "登录" : "注册" }}
            </button>
            <div class="bottom-btn mdui-text-color-theme-accent">
              &nbsp;<a href="javascript:;" @click="toggleMode">{{
                mode === "login" ? "注册账号" : "返回登录"
              }}</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MoreVert from '../components/MoreVert.vue'
import PageBackground from '../components/PageBackground.vue'
import mdui from 'mdui'
import common from '../common.vue'
import sha256 from 'crypto-js/sha256'
const $ = mdui.$
export default {
  name: 'Login',
  components: {
    MoreVert,
    PageBackground
  },
  data: () => ({
    mode: 'login',
    form: {
      name: '',
      password: '',
      confirm: ''
    },
    waiting: false
  }),
  methods: {
    submit () {
      this.waiting = true
      if (this.mode === 'register') {
        if (this.form.password !== this.form.confirm) {
          mdui.snackbar('密码不一致')
          return
        }
        this.register(this.form.name, this.form.password)
      } else {
        this.login(this.form.name, this.form.password)
      }
    },
    register (name, originPasswd) {
      const salt = Math.random().toString(36).slice(-8)
      let password = sha256(originPasswd)
      password = sha256(password + salt).toString()
      $.ajax({
        method: 'PUT',
        url: `${common.apiHost}/xusers/${name}`,
        data: {
          password,
          salt
        },
        dataType: 'json',
        timeout: 10000,
        success: resp => {
          this.getToken(name, password)
        },
        error: (xhr, errText, error) => {
          switch (xhr.status) {
            case 409:
              mdui.snackbar('用户名已被使用')
              break
            case 0:
              mdui.snackbar('请求失败')
              break
            default:
              mdui.snackbar('注册失败')
              break
          }
        }
      })
    },
    login (name, originPasswd) {
      $.ajax({
        url: `${common.apiHost}/xusers/${name}`,
        dataType: 'json',
        timeout: 10000,
        success: xuser => {
          let password = sha256(originPasswd)
          password = sha256(password + xuser.salt).toString()
          this.getToken(name, password)
        },
        error: (xhr, errText, error) => {
          switch (xhr.status) {
            case 404:
              mdui.snackbar('此用户名未注册')
              break
            case 0:
              mdui.snackbar('请求失败')
              break
            default:
              mdui.snackbar('登录失败')
              break
          }
        }
      })
    },
    getToken (name, password) {
      $.ajax({
        url: `${common.apiHost}/token`,
        method: 'POST',
        data: {
          name,
          password
        },
        timeout: 10000,
        success: token => {
          this.waiting = false
          this.$root.setXuser(name, token)
          this.$router.replace('/')
          this.$root.putOldData()
          this.$root.getXuserData()
        },
        error: (xhr, errText, error) => {
          switch (xhr.status) {
            case 403:
              mdui.snackbar('密码错误')
              break
            case 0:
              mdui.snackbar('请求失败')
              break
            default:
              mdui.snackbar('登录失败')
              break
          }
        }
      })
    },
    toggleMode () {
      if (this.mode === 'login') {
        this.mode = 'register'
      } else {
        this.mode = 'login'
      }
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
<style lang="scss">
@mixin dark-theme {
  .login-paper {
    background-color: rgba(#212121, .8);
  }
}
@mixin light-theme {
  .login-paper {
    background-color: rgba(#fff, .8);
  }
}
body.mdui-theme-layout-dark {
  @include dark-theme;
}
body.mdui-theme-layout-light {
  @include light-theme;
}
body.mdui-theme-layout-auto {
  @include light-theme;
  @media (prefers-color-scheme: dark) {
    @include dark-theme;
  }
}
.page-content {
  min-height: calc(100vh - 65px);
  border-top: 1px solid rgba(#000, 0);
  .login-paper {
    border-radius: 3px;
    margin: 16vh auto 24px auto;
    padding: 24px;
    max-width: 400px;
    .logo-img {
      width: 75px;
      margin: auto;
      img {
        width: 100%;
        height: auto;
      }
    }
    .login-title {
      font-size: 1.5rem;
      text-align: center;
    }
    .mdui-textfield {
      padding-bottom: 24px;
    }
    button {
      margin-top: 20px;
    }
    .bottom-btn {
      margin-top: 24px;
      a {
        float: right;
        &:not(:hover) {
          text-decoration: none;
        }
      }
    }
  }
}
</style>
