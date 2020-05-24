import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "@/styles/index.scss";
import "@/icons"; // icon
import "@/permission"; // permission control
Vue.use(ElementUI);

const hljs = require("highlight.js");
const md = require("markdown-it")({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});

Vue.prototype.$md = md;

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
