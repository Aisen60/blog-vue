<style lang="scss" scoped>
#aboutme {
  overflow: hidden;
  width: 100%;
  height: 100%;
  .about-left {
    float: left;
    width: 360px;
    border-radius: 4px;
    border: 1px solid #e6ebf5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .about-header {
      padding: 18px 20px;
      border-bottom: 1px solid #e6ebf5;
    }

    .about-container {
      padding: 20px;

      .user-profile {
        .user-photo {
          width: 100px;
          height: 100px;
          margin: 10px auto;
          img {
            width: 100%;
            height: 100%;
            background-position: center center;
            background-size: cover;
            border-radius: 50%;
            -webkit-transform-origin: 95% 40%;
            transform-origin: 95% 40%;
            -webkit-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
          }
        }
        .user-name,
        .user-brief-info {
          padding-top: 10px;
          text-align: center;
        }
        .user-name {
          font-weight: bold;
        }
        .user-brief-info {
          font-weight: 400;
          font-size: 14px;
          color: #777;
        }
      }

      .user-info {
        padding: 10px 0;
        .user-info-header {
          padding: 10px 0;
          border-bottom: 1px solid #e6ebf5;
        }
        .user-info-container {
          padding-top: 10px;
          li {
            display: flex;
            align-items: center;
            padding: 10px 0;
            span,
            a {
              padding-left: 10px;
            }
            a {
              color: #0366d6;
            }
          }
        }
      }

      .user-original {
        padding: 10px 0;
        .user-original-header {
          padding: 10px 0;
          border-bottom: 1px solid #e6ebf5;
        }
      }
    }
  }

  .about-right {
    float: right;
    width: calc(100% - 400px);
    height: 100%;
    border: 1px solid #e6ebf5;
    background-color: #fff;
    overflow-y: auto;
    color: #303133;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .about-right-nav {
      padding: 18px 20px;
      border-bottom: 1px solid #e6ebf5;
      display: flex;
      li {
        padding-right: 30px;
        font-weight: 500;
        cursor: pointer;

        &:hover,
        &.active {
          color: #1890ff;
        }
      }
    }

    .blog-purpose {
      /deep/ article {
        padding: 20px;
        line-height: 25px;
        font-size: 16px;
        font-weight: 400;

        p {
          padding: 10px 0;
        }
      }
    }

    .timeline {
      /deep/ h1 {
        border-bottom: 1px solid #eaecef;
        padding-bottom: 10px;
      }
      /deep/ ul {
        padding: 20px;
        line-height: 25px;
        font-size: 16px;
        font-weight: 400;

        a {
          color: #0366d6;
          text-decoration: none;
        }
      }
    }
  }
}
</style>

<template>
  <div id="aboutme">
    <div class="about-left">
      <div class="about-header">About Me</div>
      <div class="about-container">
        <div class="user-profile">
          <div class="user-photo">
            <img :src="userInfo.avatar_url" alt />
          </div>
          <div class="user-name">{{userInfo.login}}</div>
          <div class="user-brief-info">{{userInfo.bio}}</div>
        </div>
        <div class="user-info">
          <div class="user-info-header">Information</div>
          <ul class="user-info-container">
            <li>
              <svg-icon icon-class="position" />
              <span>{{userInfo.location}}</span>
            </li>
            <li>
              <svg-icon icon-class="email" />
              <a :href="'mailto:' + userInfo.email">{{userInfo.email}}</a>
            </li>
            <li>
              <svg-icon icon-class="website" />
              <a :href="userInfo.blog" target="_blank">{{userInfo.blog}}</a>
            </li>
          </ul>
        </div>
        <!-- <div class="user-original">
          <div class="user-original-header">The purpose of bloging</div>
          <div class="user-original-content" v-html="userInfoContent"></div>
        </div>-->
      </div>
    </div>

    <div class="about-right">
      <ul class="about-right-nav">
        <li :class="{'active':type === 1}" @click="type = 1">The purpose of bloging</li>
        <li :class="{'active':type === 2}" @click="type = 2">Timeline</li>
      </ul>

      <div class="blog-purpose" v-show="type === 1">
        <div class="user-original-content" v-html="userInfoContent"></div>
      </div>

      <div class="timeline" v-show="type === 2">
        <div v-html="timelineContent" v-show="false"></div>
        <el-timeline>
          <el-timeline-item
            placement="top"
            :timestamp="item.time"
            v-for="item in timeline"
            :key="item.time"
          >
            <el-card v-html="item.content"></el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownItVue from "markdown-it-vue";
import { getUserInfo, getContentContent } from "@/api/";
export default {
  name: "aboutme",
  components: {
    MarkdownItVue
  },
  data() {
    return {
      userInfo: {},
      userInfoContent: "",
      timelineContent: "",
      timeline: [],
      type: 1
    };
  },
  mounted() {
    getUserInfo()
      .then(res => {
        this.userInfo = res;
      })
      .catch(err => {});

    getContentContent("timeline.md").then(res => {
      //   this.timelineContent = decodeURIComponent(escape(window.atob(res.timelineContent)));
      this.timelineContent = res;
      setTimeout(() => {
        this.timeline = [];
        let h5Tag = document.querySelectorAll("#file h5"),
          ulTag = document.querySelectorAll("#file ul");
        for (let i = 0; i < h5Tag.length; i++) {
          this.timeline.push({
            time: h5Tag[i].innerText,
            content: ulTag[i].outerHTML
          });
        }
        document.querySelector("#user-content-里程碑").remove();
      }, 0);
    });

    getContentContent("aboutme.md")
      .then(res => {
        this.userInfoContent = res;
      })
      .catch(err => {
      });
  }
};
</script>
