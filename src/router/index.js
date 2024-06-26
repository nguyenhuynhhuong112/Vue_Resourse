import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "./authGuard";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Order from "../views/Order.vue";

const routes = [
  { path: "/login", name: "Login", component: Login },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/orders", name: "Order", component: Order },
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
    meta: { requiresAdmin: true },
  },
  {
    path: "/products",
    name: "Products",
    component: () => import("../views/Product.vue"),
    meta: { requiresProduct: true },
  },
  {
    path: "/noauthority",
    name: "NoAuthority",
    component: () => import("../views/NoAuthority.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(authGuard);

export default router;
