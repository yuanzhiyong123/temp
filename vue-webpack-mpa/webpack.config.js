const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin"); //动态输出html
const miniCssWebpackPlugin = require("mini-css-extract-plugin"); //提取css
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css
const CopyWebpackPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //清除文件目录
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const env = process.env.ENV;
const isDev = env === "development"; //判断是否是dev环境
console.log(env);

/**
 * 【遍历某文件下的文件目录】
 *
 * @param {String} path 路径
 * @returns {Array} ["about","index"]
 */
function getPath(path) {
  let arr = [];
  let existpath = fs.existsSync(path); //是否存在目录
  if (existpath) {
    let readdirSync = fs.readdirSync(path); //获取目录下所有文件
    readdirSync.map(item => {
      let currentPath = path + "/" + item;
      let isDirector = fs.statSync(currentPath).isDirectory(); //判断是不是一个文件夹
      if (isDirector) {
        // component目录下为组件 需要排除
        arr.push(item);
      }
    });
    return arr;
  }
}

/**
 * 【获取entry文件入口】
 *
 * @param {String} path 引入根路径
 * @returns {Object} 返回的entry { "about/aoubt":"./src/about/about.js",...}
 */
function getEnty(path) {
  let entry = {};
  getPath(path).map(item => {
    /**
     * 下面输出格式为{"about":".src/aobout/index.js"}
     * 这样目的是为了将js打包到对应的文件夹下
     */
    entry[`${item}`] = [
      "@babel/polyfill",
      "lib-flexible/flexible.js",
      `${path}/${item}/index.js`
    ];
  });
  return entry;
}

let htmlArr = [];
function createHtml(page_path) {
  getPath(page_path).map(item => {
    let infoJson = {},
      infoData = {};
    try {
      // 读取pageinfo.json文件内容，如果在页面目录下没有找到pageinfo.json 捕获异常
      infoJson = fs.readFileSync(`${page_path}/${item}/pageinfo.json`, "utf-8"); //
      infoData = JSON.parse(infoJson);
    } catch (err) {
      infoData = {};
    }
    htmlArr.push(
      new htmlWebpackPlugin({
        title: infoData.title ? infoData.title : "页面title",
        meta: {
          keywords: infoData.keywords ? infoData.keywords : "meta关键词",
          description: infoData.description ? infoData.description : "描述"
        },
        chunks: [`${item}`, "common", "vendors"], //引入的js
        template: "./src/template.html",
        filename: `${item}.html`, //html位置
        minify: isDev
          ? false
          : {
              //生产环境压缩html
              collapseWhitespace: true, //删除空格
              removeComments: true, //删除注释
              removeRedundantAttributes: true, //删除多余的属性
              removeScriptTypeAttributes: true, //删除script标签 多余属性
              removeStyleLinkTypeAttributes: true //删除link标签 多余属性
            }
      })
    );
  });
  return htmlArr;
}

module.exports = {
  mode: isDev ? "development" : "production",
  entry: getEnty("./src/page"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isDev ? "js/[name].js" : "js/[name].[chunkhash].js"
    // publicPath: '/'
  },
  resolve: {
    extensions: [".js", ".vue"], //import文件时 省略后缀
    alias: {
      //别名
      src: path.resolve(__dirname, "src/"),
      page: path.resolve(__dirname, "src/page/"),
      common: path.resolve(__dirname, "src/common/")
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(html)$/,
      //   use: {
      //     loader: 'html-loader',
      //     options: {
      //       // attrs: [':data-src']
      //     }
      //   }
      // },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name][hash].[ext]",
              outputPath: "images",
              publicPath: "../images"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          isDev
            ? "vue-style-loader"
            : {
                loader: miniCssWebpackPlugin.loader,
                options: {}
              },
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(styl|stylus)$/,
        use: [
          isDev
            ? "vue-style-loader"
            : {
                loader: miniCssWebpackPlugin.loader,
                options: {}
              },
          "css-loader",
          "stylus-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  optimization: {
    //代码分割
    splitChunks: {
      cacheGroups: {
        //缓存组 缓存公共代码
        common: {
          //js文件中公共模块 比如util.js
          name: "common",
          chunks: "initial", //入口处开始提取代码
          minSize: 0, //代码最小多大，进行抽离
          minChunks: 2 //代码复 2 次以上的抽离
        },
        vendors: {
          //npm包加载的公共模块
          test: /node_modules/,
          name: "vendors",
          minSize: 0,
          minChunks: 1,
          chunks: "initial",
          priority: 1 // 该配置项是设置处理的优先级，数值越大越优先处理
        }
      }
    },
    // 代码压缩
    minimizer: isDev
      ? []
      : [
          new OptimizeCssAssetsPlugin({
            //压缩css
            cssProcessor: require("cssnano"),
            cssProcessorOptions: {
              discardComments: {
                removeAll: true
              },
              // 避免 cssnano 重新计算 z-index
              safe: true
            },
            canPrint: false
          }),
          //压缩js
          new UglifyJsPlugin({})
        ]
  },
  plugins: [
    new CleanWebpackPlugin(), //每次构建时清空上一次的dist目录
    new CopyWebpackPlugin([
      // 复制插件
      {
        from: path.join(__dirname, "./src/static"),
        to: path.join(__dirname, "./dist/static")
      }
    ]),
    //拆分打包css文件
    new miniCssWebpackPlugin({
      filename: isDev ? "css/[name].css" : "css/[name].[hash].css",
      chunkFilename: isDev ? "css/[id].css" : "css/[id].[hash].css"
    }),

    //动态输出html文件
    ...createHtml("./src/page"),
    new VueLoaderPlugin()
  ],
  devServer: {
    // publicPath: 'view/',
    // contentBase: '.'
  }
};
