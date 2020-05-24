<style lang="scss" scoped>
#issues {
  height: 100%;

  .issues-title-name {
    font-size: 24px;
    margin: 0;
    padding: 0;
    line-height: 30px;
  }

  li {
    padding: 10px 0;
    list-style-type: none;
    .mainInfo {
      display: flex;
      align-items: center;
      a {
        font-size: 18px;
        font-weight: 600;
        padding: 10px 0;
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
    }

    p {
      font-size: 14px;
      color: #586069;

      span {
        padding-right: 10px;
      }
    }
  }

  .noPosts {
    padding: 10px 0;
  }

  /deep/ .el-loading-mask {
    height: 100%;
    width: calc(100% - 248px);
    position: fixed;
    left: 248px;
    top: 60px;
  }
}
</style>
<template>
  <div id="issues">
    <h1 class="issues-title-name">{{issuesTitle}}</h1>
    <ul v-loading="loading">
      <li v-for="column in issues" :key="column.id">
        <div class="mainInfo">
          <router-link :to="`/posts/${column.number}`">{{column.title}}</router-link>
          <span
            v-for="label in column.labels"
            :key="label.id"
            :style="{backgroundColor:'#' + label.color}"
          >{{label.name}}</span>
        </div>
        <p>
          <span>发布时间：{{column.created_at | parseTime}}</span>
          <span>最后更新时间：{{column.updated_at | parseTime}}</span>
        </p>
      </li>
    </ul>
    <p class="noPosts" v-if="noPosts">No posts.</p>
  </div>
</template>

<script>
import { parseTime } from "@/utils/";
import { getAllIssues } from "@/api/";

export default {
  name: "labels",
  data() {
    return {
      loading: true,
      issuesTitle: "",
      params: {
        labels: "",
        state: "open",
        page: "1",
        per_page: "300"
      },
      issues: [],
      noPosts: false
    };
  },
  filters: {
    parseTime(str) {
      return parseTime(new Date(str), "{y}-{m}-{d} {h}:{i}");
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        let labelType = to.params.labelType;
        this.issuesTitle =
          labelType === "All" ? `All posts` : `All about ${labelType} posts`;
        this.params.labels = labelType === "All" ? "" : labelType;
        this.getAllIssues(labelType);
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    getAllIssues() {
      this.issues = [];
      this.loading = true;
      getAllIssues(this.params).then(res => {
        this.issues = res;
        this.noPosts = res.length > 0 ? false : true;
        this.loading = false;
      });
    }
  }
};
</script>


