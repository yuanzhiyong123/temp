<template>
  <div class="index">
    <div class="crumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">首页</div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.index {
  .crumb {
    margin-bottom: 10px;
  }
}
</style>

