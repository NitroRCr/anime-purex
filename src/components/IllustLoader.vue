<template>
  <div class="illust-loader" ref="self">
    <div class="mdui-spinner"></div>
  </div>
</template>
<script>
export default {
  name: 'IllustLoader',
  data: () => ({
    interval: null
  }),
  mounted () {
    this.interval = setInterval(() => {
      const el = this.$refs.self
      if (el.offsetParent !== null && el.getBoundingClientRect().top <= innerHeight) {
        this.$emit('load')
      }
    }, 200)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>
<style lang="scss" scoped>
.illust-loader {
  text-align: center;
  padding: 10px;
}
</style>
