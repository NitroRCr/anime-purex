<template>
  <div id="page-background">
    <div
      class="bg-image full-screen"
      :style="{ backgroundImage: `url(${image})` }"
    ></div>
    <div class="bg-mask full-screen" :class="{ active: mask }"></div>
  </div>
</template>

<script>
import common from '@/common.vue'
export default {
  name: 'PageBackground',
  props: ['mask'],
  data () {
    return {
      image: innerWidth > innerHeight
        ? '/img/portrait-black.png'
        : '/img/landscape-black.png',
      imageAPI: this.getImage()
    }
  },
  methods: {
    setImage () {
      const image = new Image()
      image.onload = () => {
        this.image = this.imageAPI
      }
      image.src = this.imageAPI
    },
    getImage () {
      const direction = innerHeight > innerWidth ? 'portrait' : 'landscape'
      const webp = common.webpSupported ? 'true' : 'false'
      return `https://api.krytro.com:1443/setu/?direction=${direction}&webp=${webp}`
    }
  },
  mounted () {
    this.setImage()
  }
}
</script>

<style lang="scss" scoped>
#page-background {
  z-index: -3;
  .full-screen {
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .bg-image {
    transition: background 1s ease;
    background-size: cover;
    background-position: center;
    filter: brightness(80%);
    z-index: -3;
  }
  .bg-mask {
    z-index: -2;
  }
}
@mixin dark-theme {
  .bg-mask.active {
    background-color: rgba(#212121, .85);
  }
}
@mixin light-theme {
  .bg-mask.active {
    background-color: rgba(#fff, .85);
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
</style>
