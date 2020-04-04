<style lang="scss" scoped>
#posts {
  .posts-title-wrapper {
    padding-bottom: 20px;
  }

  .posts-title-info {
    display: flex;
    align-items: center;
    h1 {
      font-size: 24px;
      font-weight: 600;
      padding: 10px 0;
      margin: 0;
    }

    span {
      color: #000000;
      margin-left: 5px;
      height: 20px;
      padding: 2px 4px;
      font-size: 12px;
      font-weight: 600;
      line-height: 15px;
      border-radius: 2px;
      box-shadow: inset 0 -1px 0 rgba(27, 31, 35, 0.12);
      cursor: pointer;
    }

    p {
      font-size: 14px;
      color: #586069;

      span {
        padding-right: 10px;
      }
    }
  }
}
</style>
<template>
  <div id="posts" v-loading="loading">
    <div class="posts-title-wrapper">
      <div class="posts-title-info">
        <h1 class="posts-title">{{issuesInfo.title}}</h1>
        <span
          v-for="label in issuesInfo.labels"
          :key="label.id"
          :style="{backgroundColor:'#' + label.color}"
        >{{label.name}}</span>
      </div>
      <p>
        <span v-if="issuesInfo.created_at">发布时间：{{issuesInfo.created_at | parseTime}}</span>
        <span v-if="issuesInfo.updated_at">最后更新时间：{{issuesInfo.updated_at | parseTime}}</span>
      </p>
    </div>
    <markdown-it-vue class="posts-body-wrapper" :content="issuesInfo.body" />
  </div>
</template>

<script>
import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";
import { parseTime } from "@/utils/";
import { getIssuesDetails } from "@/api/";

export default {
  name: "posts",
  components: {
    MarkdownItVue
  },
  data() {
    return {
      loading: true,
      issuesNumber: this.$route.params.id,
      issuesInfo: {
        title: "",
        body: "",
        created_at: "",
        updated_at: ""
      }
    };
  },
  filters: {
    parseTime(str) {
      return parseTime(new Date(str), "{y}-{m}-{d} {h}:{i}");
    }
  },
  watch: {
    $router: {
      handler(to, from) {
        this.issuesNumber = this.$route.params.id;
        this.getIssuesDetails();
      },
      immediate: true
    }
  },
  methods: {
    getIssuesDetails() {
      this.loading = true;
      let issuesNumber = this.issuesNumber;
      getIssuesDetails(issuesNumber).then(res => {
        this.issuesInfo = res;
        this.loading = false;
      });
    }
  }
};
</script>

