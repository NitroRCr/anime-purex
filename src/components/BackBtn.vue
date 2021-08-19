<template>
  <button
    @click="$emit('click')"
    @mousedown="touchstart"
    @mouseup="touchend"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
    class="mdui-btn mdui-btn-icon"
    ><i class="mdui-icon material-icons">arrow_back</i></button
  >
</template>
<script>
export default {
  name: 'BackBtn',
  data () {
    return {
      timeOutEvent: 0
    }
  },
  methods: {
    touchstart () {
      this.timeOutEvent = setTimeout(() => {
        this.timeOutEvent = 0
        this.$emit('longtouch')
      }, 500)
    },
    touchmove () {
      clearTimeout(this.timeOutEvent)
      this.timeOutEvent = 0
    },
    touchend () {
      clearTimeout(this.timeOutEvent)
      this.timeOutEvent = 0
    }
  }
}
</script>
