import Vue from "vue";
import VueRouter from "vue-router";

import firebase from '@/services/firebaseConnection';

import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Perfil from "@/pages/Perfil.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/perfil/:userid",
    name: "Perfil",
    component: Perfil,
    props: true,
    meta: {
      requiresAuth: true,
    }
  },
];



const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next)=> {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !firebase.auth().currentUser){
    next('/login');
  }else{
    next();
  }
})

export default router;
