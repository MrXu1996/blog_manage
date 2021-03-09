import Vue from 'vue'
import VueRouter from 'vue-router'


// import Home from '../views/Home'
// import Register from '../views/Register'
// import Login from '../views/Login'
// import NotFound from '../views/404'

// import Welcome from '../components/Welcome'
// import Users from '../components/user/Users'
// import Articles from '../components/article/Articles'
// import Edit from '../components/article/Edit'
// import Category from '../components/article/Category'
// import Tag from '../components/article/Tag'
// import Admin from '../components/Admin'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: () => import(/* webpackChunkName: "welcome" */ '../components/Welcome')
    }, {
      path: '/users',
      component: () => import(/* webpackChunkName: "users" */ '../components/user/Users.vue')
    }, {
      path: '/articles',
      component: () => import(/* webpackChunkName: "articles" */ '../components/article/Articles.vue')
    }, {
      path: '/articles/edit',
      name: 'Edit',
      component: () => import(/* webpackChunkName: "edit" */ '../components/article/Edit.vue')
    }, {
      path: '/category',
      component: () => import(/* webpackChunkName: "category" */ '../components/article/Category.vue')
    }, {
      path: '/tag',
      component: () => import(/* webpackChunkName: "tag" */ '../components/article/Tag.vue')
    }, {
      path: '/admin',
      component: () => import(/* webpackChunkName: "admin" */ '../components/Admin.vue')
    }]
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '*',
    name: '/404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
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