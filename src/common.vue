<script>
const IllustSort = {
  DEFAULT: 0,
  RANDOM: 1,
  LIKES: 2,
  TIME: 3
}
const apiHost = 'https://apapi.krytro.com:1443'
const webpSupported = (function () {
  try {
    return document.createElement('canvas').toDataURL('image/webp', 0.5).indexOf('data:image/webp') === 0
  } catch (err) {
    return false
  }
})()
const cachedIllusts = {}
const getImageUrl = (urls, quality) => {
  if (quality === 'original') {
    return apiHost + urls.original
  }
  let url
  if (webpSupported) {
    switch (quality) {
      case 'medium':
        url = urls.medium_webp
        break
      case 'large':
        url = urls.large_webp
        break
      default:
        url = urls.large_webp
        break
    }
  } else {
    switch (quality) {
      case 'medium':
        url = urls.medium_jpg
        break
      case 'large':
        url = urls.large_jpg
        break
      default:
        url = urls.large_jpg
        break
    }
  }
  return apiHost + url
}
const getScreenSize = () => {
  if (innerWidth <= 600) return 'xs'
  if (innerWidth <= 1024) return 'sm'
  if (innerWidth <= 1440) return 'md'
  if (innerWidth <= 1920) return 'lg'
  else return 'xl'
}
setInterval(() => {
  common.screenSize = getScreenSize()
}, 200)
const common = {
  apiHost,
  IllustSort,
  webpSupported,
  cachedIllusts,
  getImageUrl,
  screenSize: getScreenSize()
}
export default common
</script>
