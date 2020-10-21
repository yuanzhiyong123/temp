
基于react和webpack的多页面应用架构，通过编译生成对应目录结构清晰的静态页面,实现多页面便捷开发维护



## 网页效果 
www.h5cool.com/react-multi-page-app/demo


## 特性
* 👩‍👩‍👧‍👧  支持多页面同时热加载开发
* 📇 自动识别新创建页面
* 📝 每个页面生成个性化信息
* 🚻 分类打包
* 🔗 灵活扩展
 


## 快速开始

安装依赖

```
$ npm install 
```

开发

```
$ npm run dev
```

编译

```
$ npm run build
```

打包后测试运行
```
$ npm start
```

自动打开浏览器浏览页面 开发: http://localhost:3100  

## 开发及使用

在 ```src``` 下的 ```pages``` 目录里添加新页面文件夹并创建 入口js 必须名为```index.js``` , pageinfo.json中配置页面的title及meta标签

```
|-- src
    |-- index/
        |-- index.js (入口js必须命名为index.js)
        |-- page1.scss
        |-- pageinfo.json
    |-- page2/
        |-- index.js (入口js必须命名为index.js)
        |-- page2.scss
        |-- pageinfo.json
```
