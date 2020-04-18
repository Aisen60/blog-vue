<style lang="scss" scoped>
#timeline {
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
</style>
<template>
  <div id="timeline">
    <div v-html="content" v-show="false"></div>
    <div v-html="title.outerHTML"></div>
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
</template>

<script>
import MarkdownItVue from "markdown-it-vue";
import { getContentContent } from "@/api/";

export default {
  name: "timeline",
  components: {
    MarkdownItVue
  },
  data() {
    return {
      content: "",
      title: "",
      timeline: []
    };
  },
  mounted() {
    getContentContent("timeline.md").then(res => {
      //   this.content = decodeURIComponent(escape(window.atob(res.content)));
      this.content = res;
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
        this.title = document.querySelector("#file h1");
        console.log(this.timeline, this.title);
        document.querySelector("#user-content-里程碑").remove();
      }, 0);
    });
  }
};
</script>

