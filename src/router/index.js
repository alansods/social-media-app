import Vue from "vue";
import VueRouter from "vue-router";

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
  },
  {
    path: "/perfil/:userid",
    name: "Perfil",
    component: Perfil,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
