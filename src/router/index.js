import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Register from '../views/Register'
import Login from '../views/Login'
import NotFound from '../views/404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: '/404',
    component: NotFound
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const isLogin = window.sessionStorage.getItem('eleToken')
  if (!isLogin) return next('/login')
  next()
})

export default router
