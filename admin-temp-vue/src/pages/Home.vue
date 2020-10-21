<template>
  <div class="wrap">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="content" :class="{collapse: isCollapse}">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
    };
  },
  mounted() {
    this.verify(); //登陆校验
  },
  computed: {
    ...mapGetters({
      isCollapse: 'getIsCollapse'  //获取导航栏折叠状态
    })
  },
  methods: {
    ...mapActions(["verify"])
  },
  components: {
    "v-header": Header,
    "v-nav": Nav
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import '../assets/css/common.styl';

.content {
  position: absolute;
  top: $header_height;
  left: $nav_width;
  bottom: 0;
  right: 0;
  background: #e0dede;
  padding: 10px;
  overflow-y: auto;
  transition : .5s all;
  &.collapse {
    left: 64px;
  }
}
</style>

