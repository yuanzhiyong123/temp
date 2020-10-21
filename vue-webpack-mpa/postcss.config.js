module.exports = {
  parser: false,
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 72, //根据设计稿的宽度设定
      propList: ["*"]
    }
  }
};
