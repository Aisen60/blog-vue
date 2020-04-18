import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const constantRoutes = [
  {
    path: "/",
    redirect: "/issues/All",
    component: () => import("@/views/index"),
    children: [
      {
        path: "/issues/:labelType",
        component: () => import("@/views/issues")
      },
      {
        path: "/posts/:id",
        component: () => import("@/views/posts")
      },
      // {
      //   path: "/TimeLine",
      //   name: "TimeLine",
      //   component: () => import("@/views/timeline")
      // },
      {
        path: "AboutMe",
        name: "AboutMe",
        component: () => import("@/views/aboutme")
      }
    ]
  },

  {
    path: "/404",
    component: () => import("@/views/404")
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404" }
];

const createRouter = () =>
  new Router({
    mode: "hash", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
