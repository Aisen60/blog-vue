import router from "./router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  next();
});

router.afterEach(() => {
  NProgress.done();
});
