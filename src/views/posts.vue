<style lang="scss" scoped>
@import "../styles/github.css";
#posts {
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

  .article-body {
    // padding: 20px;
    // word-break: break-word;

    /deep/ h1,
    /deep/ h2 {
      padding-bottom: 0.3em;
      border-bottom: 1px solid #eaecef;
    }

    p {
      margin-bottom: 16px;
    }

    /deep/ ul {
      // list-style-type: disc;
      margin-top: 0;
      margin-bottom: 16px;
      padding-left: 2em;
    }

    /deep/ li + li {
      margin-top: 0.25em;
    }

    /deep/ img {
      max-width: 100%;
      max-height: 100%;
    }

    /deep/ a {
      color: #0366d6;
      text-decoration: none;
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
    <section class="article-body" v-html="issuesInfo.body"></section>
  </div>
</template>

<script>
import { parseTime } from "@/utils/";
import { getIssuesDetails, getIssuesAllContents } from "@/api/";

export default {
  name: "posts",
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
      getIssuesDetails(issuesNumber)
        .then(res => {
          res.body = this.$md.render(res.body);
          this.issuesInfo = res;
          this.loading = false;
          return getIssuesAllContents(issuesNumber);
        })
        .then(res => {
          let body = "";
          res.map(val => {
            body += this.$md.render(val.body);
          });
          this.issuesInfo.body += body;
        })
        .catch(err => {});
    }
  }
};
</script>

