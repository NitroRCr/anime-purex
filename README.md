# anime-purex

一个二次元图片网站的前端

基于VueJS开发，是SPA(单页面应用)、PWA(渐进式Web应用)

后端项目：[NitroRCr/AnimePureX](https://github.com/NitroRCr/AnimePureX)



### 技术栈

vue2 + vue-router + ES6 + sass

### 实现功能

- 图片的浏览、筛选、搜索、下载
- 简单的用户功能：用户登录、收藏图片和画师

## 配置

```javascript
// src/common.vue
const apiHost = ''	// 后端API地址
const youdao = {	// 有道翻译API的密钥。不填则无法使用机翻功能
  appKey: '',
  key: ''
}
```



## Project setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
