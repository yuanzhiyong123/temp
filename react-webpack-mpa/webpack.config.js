const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css分离打包
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); //js压缩
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //css压缩
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //清除文件目录
const createHtml = require("./config/create-html"); // html配置
const getEntry = require("./config/get-entry");
const entry = getEntry("./src/pages");
const htmlArr = createHtml("./src/pages");

//主配置
module.exports = (env, argv) => {
  const isDev = argv.mode === "development"; //判断是否是dev环境
  return {
    entry: entry,
    output: {
      path: path.join(__dirname, "dist"),
      filename: isDev ? "js/[name].js" : "js/[name].[chunkhash].js",
      publicPath: "/"
    },
    resolve: {
      extensions: [".js", ".jsx", ".vue"], //import文件时 省略后缀
      alias: {
        //别名
        src: path.resolve(__dirname, "src/"),
        page: path.resolve(__dirname, "src/page/"),
        common: path.resolve(__dirname, "src/common/")
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                { plugins: ["@babel/plugin-proposal-class-properties"] } //这句很重要 不然箭头函数出错
              ]
            }
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
          exclude: /node_modules/
        },
        {
          test: /\.(scss|css)$/, //css打包 路径在plugins里
          use: [
            argv.mode == "development"
              ? { loader: "style-loader" }
              : MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { url: false, sourceMap: true } },
            { loader: "sass-loader", options: { sourceMap: true } },
            "postcss-loader"
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(jpg|png|gif|bmp|jpeg)$/,
          loader: "url-loader",
          options: {
            // publicPath: '/',
            limit: 8192,
            name: "images/[hash:8].[name].[ext]"
          }
        }
      ]
    },
    devServer: {
      port: 3100,
      open: true
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, "src/"),
        component: path.resolve(__dirname, "src/component/"),
        store: path.resolve(__dirname, "src/store/")
      }
    },
    plugins: [
      new CleanWebpackPlugin(), //每次构建时清空上一次的dist目录
      ...htmlArr, // html插件数组
      new MiniCssExtractPlugin({
        //分离css插件
        filename: isDev ? "css/[name].css" : "css/[name].[hash].css",
        chunkFilename: isDev ? "css/[id].css" : "css/[id].[hash].css"
      })
    ],
    optimization: {
      minimizer: [
        //压缩js
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: false
        }),
        new OptimizeCSSAssetsPlugin({})
      ],
      splitChunks: {
        //压缩css
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            enforce: true
          }
        }
      }
    }
  };
};
