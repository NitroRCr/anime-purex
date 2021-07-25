<template>
  <button class="star-btn mdui-btn-icon mdui-btn" @click="toggle()"><i class="mdui-icon material-icons">{{ icon }}</i></button>
</template>
<script>
export default {
  name: 'Collect',
  props: {
    tag: { required: true }
  },
  data: function () {
    return { collected: this.isCollected() }
  },
  computed: {
    icon () {
      return this.collected ? 'star' : 'star_border'
    }
  },
  methods: {
    isCollected () {
      const list = JSON.parse(localStorage.collectedTags)
      if (list.indexOf(this.tag) === -1) {
        return false
      } else {
        return true
      }
    },
    toggle () {
      const collected = this.isCollected()
      const list = JSON.parse(localStorage.collectedTags)
      if (collected) {
        list.splice(list.indexOf(this.tag), 1)
        this.collected = false
      } else {
        list.push(this.tag)
        this.collected = true
      }
      localStorage.collectedTags = JSON.stringify(list)
    },
    refresh () {
      this.collected = this.isCollected()
    }
  }
}
</script>
