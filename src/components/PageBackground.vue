<template>
  <div
    id="page-background"
    :style="{ backgroundImage: `url(${image})` }"
  >
    <div class="bg-mask" :class="{ active: mask }"></div>
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
    randint: (obj) => obj[Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)]],
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
  transition: background 1s ease;
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: -1;
  filter: brightness(80%);
  .bg-mask.active {
    height: 100%;
    background-color: rgba(#fff, .85);
  }
}
</style>
