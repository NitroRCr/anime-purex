<template>
  <div class="mdui-dialog" id="dialog-theme">
    <div class="mdui-dialog-title">设置主题</div>
    <div class="mdui-dialog-content">
      <p class="mdui-typo-title">外观</p>
      <div class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3">
        <div class="mdui-col">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-layout"
              value="auto"
              v-model="inputColors.layout"
            />
            <i class="mdui-radio-icon"></i>
            自动
          </label>
        </div>
        <div class="mdui-col">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-layout"
              value="light"
              v-model="inputColors.layout"
            />
            <i class="mdui-radio-icon"></i>
            亮色
          </label>
        </div>
        <div class="mdui-col">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-layout"
              value="dark"
              v-model="inputColors.layout"
            />
            <i class="mdui-radio-icon"></i>
            暗色
          </label>
        </div>
      </div>
      <p class="mdui-typo-title mdui-text-color-theme">主题色</p>
      <form class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3">
        <div class="mdui-col mdui-text-color-amber">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="amber"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Amber
          </label>
        </div>
        <div class="mdui-col mdui-text-color-blue">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="blue"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Blue
          </label>
        </div>
        <div class="mdui-col mdui-text-color-blue-grey">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="blue-grey"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Blue Grey
          </label>
        </div>
        <div class="mdui-col mdui-text-color-brown">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="brown"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Brown
          </label>
        </div>
        <div class="mdui-col mdui-text-color-cyan">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="cyan"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Cyan
          </label>
        </div>
        <div class="mdui-col mdui-text-color-deep-orange">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="deep-orange"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Deep Orange
          </label>
        </div>
        <div class="mdui-col mdui-text-color-deep-purple">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="deep-purple"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Deep Purple
          </label>
        </div>
        <div class="mdui-col mdui-text-color-green">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="green"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Green
          </label>
        </div>
        <div class="mdui-col mdui-text-color-grey">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="grey"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Grey
          </label>
        </div>
        <div class="mdui-col mdui-text-color-indigo">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="indigo"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Indigo
          </label>
        </div>
        <div class="mdui-col mdui-text-color-light-blue">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="light-blue"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Light Blue
          </label>
        </div>
        <div class="mdui-col mdui-text-color-light-green">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="light-green"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Light Green
          </label>
        </div>
        <div class="mdui-col mdui-text-color-lime">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="lime"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Lime
          </label>
        </div>
        <div class="mdui-col mdui-text-color-orange">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="orange"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Orange
          </label>
        </div>
        <div class="mdui-col mdui-text-color-pink">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="pink"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Pink
          </label>
        </div>
        <div class="mdui-col mdui-text-color-purple">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="purple"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Purple
          </label>
        </div>
        <div class="mdui-col mdui-text-color-red">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="red"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Red
          </label>
        </div>
        <div class="mdui-col mdui-text-color-teal">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="teal"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Teal
          </label>
        </div>
        <div class="mdui-col mdui-text-color-yellow">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-primary"
              value="yellow"
              v-model="inputColors.theme"
            />
            <i class="mdui-radio-icon"></i>
            Yellow
          </label>
        </div>
      </form>

      <p class="mdui-typo-title mdui-text-color-theme-accent">强调色</p>
      <form class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3">
        <div class="mdui-col mdui-text-color-amber">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-accent"
              value="amber"
              v-model="inputColors.accent"
            />
            <i class="mdui-radio-icon"></i>
            Amber
          </label>
        </div>
        <div class="mdui-col mdui-text-color-blue">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-accent"
              value="blue"
              v-model="inputColors.accent"
            />
            <i class="mdui-radio-icon"></i>
            Blue
          </label>
        </div>
        <div class="mdui-col mdui-text-color-cyan">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-accent"
              value="cyan"
              v-model="inputColors.accent"
            />
            <i class="mdui-radio-icon"></i>
            Cyan
          </label>
        </div>
        <div class="mdui-col mdui-text-color-deep-orange">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-accent"
              value="deep-orange"
              v-model="inputColors.accent"
            />
            <i class="mdui-radio-icon"></i>
            Deep Orange
          </label>
        </div>
        <div class="mdui-col mdui-text-color-deep-purple">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-accent"
              value="deep-purple"
              v-model="inputColors.accent"
            />
            <i class="mdui-radio-icon"></i>
            Deep Purple
          </label>
        </div>
        <div class="mdui-col mdui-text-color-green">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-accent"
              value="green"
              v-model="inputColors.accent"
            />
            <i class="mdui-radio-icon"></i>
            Green
          </label>
        </div>
        <div class="mdui-col mdui-text-color-indigo">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-accent"
              value="indigo"
              v-model="inputColors.accent"
            />
            <i class="mdui-radio-icon"></i>
            Indigo
          </label>
        </div>
        <div class="mdui-col mdui-text-color-light-blue">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-accent"
              value="light-blue"
              v-model="inputColors.accent"
            />
            <i class="mdui-radio-icon"></i>
            Light Blue
          </label>
        </div>
        <div class="mdui-col mdui-text-color-light-green">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-accent"
              value="light-green"
              v-model="inputColors.accent"
            />
            <i class="mdui-radio-icon"></i>
            Light Green
          </label>
        </div>
        <div class="mdui-col mdui-text-color-lime">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-accent"
              value="lime"
              v-model="inputColors.accent"
            />
            <i class="mdui-radio-icon"></i>
            Lime
          </label>
        </div>
        <div class="mdui-col mdui-text-color-orange">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-accent"
              value="orange"
              v-model="inputColors.accent"
            />
            <i class="mdui-radio-icon"></i>
            Orange
          </label>
        </div>
        <div class="mdui-col mdui-text-color-pink">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-accent"
              value="pink"
              v-model="inputColors.accent"
            />
            <i class="mdui-radio-icon"></i>
            Pink
          </label>
        </div>
        <div class="mdui-col mdui-text-color-purple">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-accent"
              value="purple"
              v-model="inputColors.accent"
            />
            <i class="mdui-radio-icon"></i>
            Purple
          </label>
        </div>
        <div class="mdui-col mdui-text-color-red">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-accent"
              value="red"
              v-model="inputColors.accent"
            />
            <i class="mdui-radio-icon"></i>
            Red
          </label>
        </div>
        <div class="mdui-col mdui-text-color-teal">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-accent"
              value="teal"
              v-model="inputColors.accent"
            />
            <i class="mdui-radio-icon"></i>
            Teal
          </label>
        </div>
        <div class="mdui-col mdui-text-color-yellow">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="doc-theme-accent"
              value="yellow"
              v-model="inputColors.accent"
            />
            <i class="mdui-radio-icon"></i>
            Yellow
          </label>
        </div>
      </form>
    </div>
    <div class="mdui-divider"></div>
    <div class="mdui-dialog-actions">
      <button
        class="mdui-btn mdui-ripple mdui-float-left"
        mdui-dialog-cancel=""
        @click="recover"
      >
        恢复默认主题
      </button>
      <button
        class="mdui-btn mdui-ripple"
        mdui-dialog-confirm=""
        @click="apply"
      >
        应用
      </button>
    </div>
  </div>
</template>
<script>
import mdui from 'mdui'
const $ = mdui.$
export default {
  name: 'DialogTheme',
  data: () => ({
    defaultColors: {
      layout: 'auto',
      theme: 'deep-purple',
      accent: 'pink'
    },
    currColors: {
      layout: 'auto',
      theme: 'deep-purple',
      accent: 'pink'
    },
    inputColors: {
      layout: 'auto',
      theme: 'deep-purple',
      accent: 'pink'
    }
  }),
  mounted () {
    let colors
    if (localStorage.colors) {
      colors = JSON.parse(localStorage.colors)
    } else {
      colors = this.defaultColors
      localStorage.colors = JSON.stringify(colors)
    }
    this.inputColors = colors
    this.apply()
  },
  methods: {
    getClasses (colors) {
      return `mdui-theme-layout-${colors.layout} mdui-theme-primary-${colors.theme} mdui-theme-accent-${colors.accent}`
    },
    apply () {
      $('body')
        .removeClass(this.getClasses(this.currColors))
        .addClass(this.getClasses(this.inputColors))
      for (const key in this.currColors) {
        this.currColors[key] = this.inputColors[key]
      }
      localStorage.colors = JSON.stringify(this.currColors)
    },
    recover () {
      for (const key in this.inputColors) {
        this.inputColors[key] = this.defaultColors[key]
      }
      this.apply()
    }
  }
}
</script>
