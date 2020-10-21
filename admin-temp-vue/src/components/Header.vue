<template>
  <div class="header">
    <div class="fold_btn" @click="setCollapse">
      <i class="el-icon-menu"></i>
    </div>
    <div class="title">管理后台</div>
    <div class="userInfo">
      <div class="avata">
        <img src="../assets/images/user.png" alt>
      </div>
      <div class="username">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{getUserName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {deleteCookie} from '@/assets/js/util.js';
export default {
  name: "Header",
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "getUserName", //获取用户
      "getVerifyUrl"  //获取跳转登陆url
    ])
  },
  methods: {
    ...mapMutations([
      'setCollapse'
    ]),
    handleCommand(command) {
      switch (command) {  //退出登陆
        case "a":
          deleteCookie('sid');  //清除cookie
          window.location.href = this.getVerifyUrl;  //跳转到登陆页面
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import '../assets/css/common.styl';

.header {
  height: $header_height;
  background: $header_bg;

  .fold_btn {
    float: left;
    width: $header_height;
    height: 100%;
    line-height: $header_height;
    text-align: center;
    font-size: 28px;
    color: $header_color;
    cursor: pointer;
  }

  .title {
    float: left;
    height: 100%;
    line-height: $header_height;
    font-size: 20px;
    color: $header_color;
  }

  .userInfo {
    float: right;
    height: $header_height;
    line-height: $header_height;
    margin-right: 40px;

    .avata {
      float: left;
      width: 40px;
      height: 40px;
      margin-right: 10px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .username {
      float: left;
      color: $header_color;

      .el-dropdown-link {
        color: $header_color;
      }
    }
  }
}
</style>

