<template>
  <div class="nav" :class="{collapse: isCollapse}">
    <el-menu
      :collapse="isCollapse"
      :default-active="onRoutes"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      items: [
        {
          icon: "el-icon-tickets",
          index: "/home",
          title: "主页"
        },
        {
          icon: "el-icon-tickets",
          index: "6",
          title: "列表相关",
          subs: [
            {
              index: "/home/list",
              title: "列表页"
            }
          ]
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path;
    },
    ...mapGetters({
      isCollapse: "getIsCollapse"
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import '../assets/css/common.styl';

.nav {
  position: absolute;
  top: $header_height;
  left: 0;
  bottom: 0;
  width: $nav_width;
  background: #545c64;
  overflow-y: auto;
  overflow-x: hidden;
  transition: 0.5s all;

  &.collapse {
    width: 64px;
  }

  .el-menu {
    border: none;
  }
}
</style>

