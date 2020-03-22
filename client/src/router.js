import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Register from './views/Register'
import Nofind from './views/404'
import Login from './views/Login'
import BookOrder from './views/BookOrder'
import BookOrderAch from './views/BookOrderAch'
import BookEvaluate from './views/BookEvaluate'
import Overview from './views/Overview'
import TeacherView from "./views/TeacherView"
import ExpendList from "./views/ExpendList"
import DataInc from "./views/DataInc"

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '*', name: 'Overview', component: Overview },
    { path: '/404', name: '404 ', component: Nofind},
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        { path: '/', name: 'Overview', component: Overview },
        { path: '/overview', name: 'Overview', component: Overview },
        { path: '/bookorder', name: 'bookorder', component: BookOrder },
        { path: '/bookorderach', name: 'bookorderach', component: BookOrderAch },
        { path: '/bookevaluate', name: 'bookevaluate', component: BookEvaluate },
        { path: '/teacherview', name: 'teacherview', component: TeacherView },
        { path: '/expendlist', name: 'expendlist', component: ExpendList },
        { path: '/datainc', name: 'datainc', component: DataInc }
      ]
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  const role = localStorage.role ? localStorage.role : "";
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }

  // 权限控制
  console.log(to.path);
  if(to.path === "/overview"){
    if(role == "teacher"){
      next("/teacherview");
    }else{
      next();
    }
  }

})

export default router;