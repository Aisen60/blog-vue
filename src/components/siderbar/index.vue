<template>
  <div class="book-siderbar">
    <a href="/" class="book-logo">
      <img src="@/assets/img/logo.png" alt="logo" />
      <h1>{{defaultSettings.title}}</h1>
    </a>
    <ul class="book-siderbar-label" v-loading="loading">
      <li v-for="menu in siderbarList" :key="menu.id">
        <router-link
          v-if="!menu.target"
          :to="`/issues/${menu.name}`"
          :class="{'active':$route.params.labelType === menu.name}"
        >{{menu.name}}</router-link>
        <router-link
          v-else
          :to="menu.target"
          :class="{'active':$route.name === menu.name}"
        >{{menu.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import defaultSettings from "@/settings";
import { getBlogLabelList } from "@/api/";
export default {
  name: "siderbar",
  data() {
    return {
      defaultSettings: defaultSettings,

      loading: true,

      siderbarList: [],

      siderbarCustomList: [
        {
          id: 1585583171335,
          name: "AboutMe",
          target: "/AboutMe"
        },
        // {
        //   id: 1585583180245,
        //   name: "TimeLine",
        //   target: "/TimeLine"
        // },
        {
          id: 1585754423724,
          name: "All"
        }
      ]
    };
  },
  mounted() {
    this.getBlogLabelList();
  },
  methods: {
    getBlogLabelList() {
      getBlogLabelList()
        .then(res => {
          this.siderbarList = [...this.siderbarCustomList, ...res];
          this.loading = false;
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss">
.book-siderbar {
  width: 248px;
  height: 100%;
  background-color: #f7f8f9;
  position: relative;

  .book-logo {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e7e7e7;
    img {
      width: 54px;
    }
    h1 {
      font-size: 16px;
      padding-left: 10px;
      margin: 0;
    }
  }

  .book-siderbar-label {
    padding: 20px;
    font-size: 16px;
    list-style-type: none;
    li {
      //   line-height: 30px;
      margin-bottom: 20px;
      a {
        color: #2f2f2f;
        font-weight: 400;
        &:hover {
          color: gray;
        }
        &.active {
          color: #004ed0;
          font-weight: 600;
        }
      }
    }
  }

  /deep/ .el-loading-mask {
    top: 100px;
    background: transparent;
  }
}
</style>

