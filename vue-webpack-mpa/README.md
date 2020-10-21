## webpack构建多页面应用

### 使用注意
 1.新增页面 在page下添加对应的文件夹，文件内容按照模板格式
 2.支持移动端rem布局，直接再文件内使用 `px` 即可，工具会自动转换为rem, 只需依据设计稿的宽度改变 postcss.config.js中的`rootValue`即可。

### 使用
```
npm install
```
### 本地开发
```
npm run dev
```

### 打包构建
```
npm run build
```
