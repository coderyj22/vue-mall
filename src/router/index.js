import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from "../components/home/Home";
import Category from "../components/category/Category";
import Profile from "../components/profile/Profile";
import Cart from "../components/cart/Cart";
import GoodDetail from "../components/home/children/GoodDetail";

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home,
    children:[
      {
        path:':id',
        component:GoodDetail
      }
    ]
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  }


]

const router = new Router({
  routes,
  mode: 'history'
})

export default router