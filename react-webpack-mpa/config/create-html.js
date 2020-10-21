
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");//生成html文件
const getPath = require("./get-path");
let htmlArr = [];
function createHtml(page_path) {
	getPath(page_path).map((item) => {
		let infoJson = {}, infoData = {};
		try {
			// 读取pageinfo.json文件内容，如果在页面目录下没有找到pageinfo.json 捕获异常
			infoJson = fs.readFileSync(`${page_path}/${item}/pageinfo.json`, "utf-8");//
			infoData = JSON.parse(infoJson);
		} catch (err) {
			infoData = {};
		}
		htmlArr.push(new HtmlWebpackPlugin({
			title: infoData.title ? infoData.title : "页面title",
			meta: {
				keywords: infoData.keywords ? infoData.keywords : "meta关键词",
				description: infoData.description ? infoData.description : "描述"
			},
			chunks: [`${item}`], //引入的js
			template: "./src/template.html",
			filename: `${item}.html`, //html位置
			minify: {//压缩html
				collapseWhitespace: true,
				preserveLineBreaks: true
			},
		}));
	});
	return htmlArr;
}


module.exports = createHtml;
