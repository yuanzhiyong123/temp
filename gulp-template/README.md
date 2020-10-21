## 一套通用的前端多页面构建模板

### 支持功能

- [x] js 压缩
- [x] es6
- [x] html 压缩
- [x] css 压缩
- [x] stylus css预编译
- [x] 图片压缩
- [x] 本地服务器
- [x] 服务器热更新功能
- [x] css、js文件自动添加hash值，去除缓存


### 使用

1. src目录为开发目录， 默认会编译生成v1目录为编译后目录， 可自行在gulpfile.js文件内通过修改 const buildDir = 'v1'; 来修改编译后目录
2. 将代码克隆到本地后， 执行npm install 后 执行 npm run dev 开启本地服务进行开发
3. 目前模板还有点小瑕疵，但不影响使用， 建议在开发完成后手动删除编译好的目录， 重新执行npm run build 生成 编译目录

### 本地开发

```
npm install  //安装依赖
npm run dev  //开启本地开发环境
```

### 编译打包

```
npm run build
```