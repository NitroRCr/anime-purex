<script>
const IllustSort = {
  DEFAULT: 0,
  RANDOM: 1,
  LIKES: 2,
  TIME: 3
}
const AgeLimit = {
  ALL_AGE: 0,
  R_18: 1
}
const APIType = {
  PIXIV: 0
}
const apiHost = 'https://api.krytro.com:1443/purex'
const youdao = {
  appKey: '',
  key: ''
}
const ajax = function (params) {
  params = params || {}
  params.data = params.data || {}
  params.jsonp ? jsonp(params) : json(params)
  function json (params) {
    params.method = (params.method || 'GET').toUpperCase()
    const urlData = formatParams(params.data)
    const xhr = new window.XMLHttpRequest()
    const headers = params.headers || {}
    if (params.method === 'GET') {
      xhr.open(params.method, params.url + '?' + urlData, true)
      setHeaders(xhr, headers)
      xhr.send(null)
    } else {
      xhr.open(params.method, params.url, true)
      setHeaders(xhr, headers)
      xhr.send(JSON.stringify(params.data))
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const status = xhr.status
        if (status >= 200 && status < 300) {
          let response = ''
          const type = xhr.getResponseHeader('Content-Type')
          if (type.indexOf('xml') !== -1 && xhr.responseXML) {
            response = xhr.responseXML
          } else if (type.indexOf('application/json') !== -1) {
            response = JSON.parse(xhr.responseText)
          } else {
            response = xhr.responseText
          }
          params.success && params.success(response)
        } else {
          params.error && params.error(status)
        }
      }
    }
  }
  function jsonp (params) {
    const callbackName = params.jsonp
    const head = document.getElementsByTagName('head')[0]
    params.data.callback = callbackName
    const data = formatParams(params.data)
    const script = document.createElement('script')
    head.appendChild(script)
    window[callbackName] = function (json) {
      head.removeChild(script)
      clearTimeout(script.timer)
      window[callbackName] = null
      params.success && params.success(json)
    }
    script.src = params.url + '?' + data
    if (params.timeout) {
      script.timer = setTimeout(function () {
        window[callbackName] = null
        head.removeChild(script)
        params.error && params.error({
          message: '超时'
        })
      }, params.timeout)
    }
  }
  function formatParams (data) {
    const arr = []
    for (const key in data) {
      arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    }
    arr.push('v=' + random())
    return arr.join('&')
  }
  function random () {
    return Math.floor(Math.random() * 10000 + 500)
  }
  function setHeaders (xhr, headers) {
    for (const key in headers) {
      xhr.setRequestHeader(key, headers[key])
    }
  }
}
let webpSupported = (function () {
  try {
    return document.createElement('canvas').toDataURL('image/webp', 0.5).indexOf('data:image/webp') === 0
  } catch (err) {
    return false
  }
})();
(function () {
  var img = new Image()
  function getResult (event) {
    webpSupported = event && event.type === 'load' ? img.width === 1 : false
    common.webpSupported = webpSupported
  }
  img.onerror = getResult
  img.onload = getResult
  img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=' // 一像素图片
})()
const cachedIllusts = {}
const cachedUsers = {}
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
const getMediumImage = illust => {
  const src = getImageUrl(illust.image_urls[0], 'medium')
  const img = new Image()
  img.onload = (event) => {
    illust.aspectRadio = event.target.width / event.target.height
  }
  img.src = src
  return src
}
const getScreenSize = () => {
  if (innerWidth <= 600) return 'xs'
  if (innerWidth <= 1024) return 'sm'
  if (innerWidth <= 1440) return 'md'
  if (innerWidth <= 1920) return 'lg'
  else return 'xl'
}
const copyText = function (content) {
  var aux = document.createElement('input')
  aux.setAttribute('value', content)
  document.body.appendChild(aux)
  aux.select()
  document.execCommand('copy')
  document.body.removeChild(aux)
}
setInterval(() => {
  common.screenSize = getScreenSize()
}, 200)
const evaluators = [
  {
    name: 'quality_v1',
    showName: '高质量v1',
    icon: 'high_quality'
  },
  {
    name: 'cute_v1',
    showName: '可爱'
  }
]
const common = {
  apiHost,
  youdao,
  ajax,
  IllustSort,
  AgeLimit,
  APIType,
  webpSupported,
  cachedIllusts,
  cachedUsers,
  getImageUrl,
  getMediumImage,
  screenSize: getScreenSize(),
  copyText,
  evaluators
}
const localDataVer = '2'
if (localStorage.localDataVer !== localDataVer) {
  localStorage.clear()
  localStorage.localDataVer = localDataVer
}
if (!localStorage.collectedTags) localStorage.collectedTags = JSON.stringify([])
export default common
</script>
