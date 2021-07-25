<template>
  <div id="page-footer">
    <div class="space-holder"></div>
    <footer>
      <div class="mdui-text-color-theme-secondary">NitroFire © 2021.</div>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'PageFooter'
}
</script>
<style lang="scss" scoped>
.space-holder {
  height: 75px;
}
footer {
  position: absolute;
  bottom: 30px;

  > div {
    margin-left: 10px;
    font-weight: bold;
  }
}
</style>
