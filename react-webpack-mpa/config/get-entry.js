const getPath = require("./get-path");
/**
 * 【获取entry文件入口】
 *
 * @param {String} path 引入根路径
 * @returns {Object} 返回的entry { "about/aoubt":"./src/about/about.js",...}
 */
module.exports = function getEnty(path){
	let entry = {};
	getPath(path).map((item)=>{
		/**
		 * 下面输出格式为{"about":".src/aobout/index.js"}
		 * 这样目的是为了将js打包到对应的文件夹下
		 */
		entry[`${item}`] = `${path}/${item}/index.js`;
	});
	return entry;
};
