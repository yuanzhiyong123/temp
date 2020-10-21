<template>
  <div class="page">
    <div class="msg">{{ msg }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "hello, world"
    };
  },
  methods: {}
};
</script>
<style lang="stylus" scoped>
.page {
  .msg {
    color: red;
    font-size: 30px;
    width: 656px;
    height: 110px;
    background: #19BAA9;
    border-radius: 8px;
  }
}
</style>
