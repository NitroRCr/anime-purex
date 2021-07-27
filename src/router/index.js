import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Illust from '../views/Illust.vue'
import Search from '../views/Search.vue'
import Favorited from '../views/Favorited.vue'
import Tag from '../views/Tag.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/illusts/:id',
    name: 'Illust',
    component: Illust
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/favorited',
    name: 'Favorited',
    component: Favorited
  },
  {
    path: '/tags/:tag',
    name: 'Tag',
    component: Tag
  },
  {
    path: '/users/:id',
    name: 'User',
    component: User
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
