<template>
  <div class="book-container">
    <siderbar></siderbar>
    <div class="book-content">
      <router-view />
      <!-- <div class="webInfo">
        <p>{{setting.blogInfo.creator}}</p>
        <p>{{setting.blogInfo.recordNumber}}</p>
      </div>-->
    </div>
  </div>
</template>

<script>
import setting from "@/settings";
import Siderbar from "@/components/siderbar/";
export default {
  name: "book",
  data() {
    return {
      setting
    };
  },
  components: {
    Siderbar
  }
};
</script>
<style lang="scss">
.book-container {
  height: 100%;
  display: flex;
  overflow: hidden;
}

.book-content {
  flex: 1;
  min-width: 1000px;
  padding: 20px;
  overflow: auto;
}

.webInfo {
  text-align: center;
  padding: 20px 0;
  line-height: 30px;
}
</style>
