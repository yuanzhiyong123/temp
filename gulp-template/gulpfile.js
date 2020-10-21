const gulp = require('gulp');
const minifyJs = require('gulp-uglify');
const minifyCss = require('gulp-clean-css');
const minifyImg = require('gulp-imagemin');
const minifyHtml = require('gulp-htmlmin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegtran = require('imagemin-jpegtran');
const stylus = require('gulp-stylus');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const browserSync = require('browser-sync'); //服务器
const reload = browserSync.reload; //静态服务器热更新
const rev = require('gulp-rev');
const revCol = require('gulp-rev-collector'); //替换
const gulpSync = require('gulp-sync')(gulp); //gulp 同步执行操作模块
const eslint = require('gulp-eslint');


const buildDir = 'v1'; //定义打包后目录

//清除打包后目录
gulp.task("clean", function () {
  return gulp.src('./' + buildDir + '')
    .pipe(clean());
})

//清除js文件
gulp.task("clean_js", function () {
  return gulp.src('./' + buildDir + '/js/*.js')
    .pipe(clean());
})
//清除css文件
gulp.task("clean_css", function () {
  return gulp.src('./' + buildDir + '/css/*.css')
    .pipe(clean());
})

//清除static文件
gulp.task("clean_static", function () {
  return gulp.src('./' + buildDir + '/static')
    .pipe(clean());
})


//js 编译及压缩、添加版本号
gulp.task('js', () => {
  return gulp.src('src/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(minifyJs())
    .pipe(rev())
    .pipe(gulp.dest('' + buildDir + '/js'))
    .pipe(rev.manifest()) //生成对比json文件
    .pipe(gulp.dest('' + buildDir + '/rev/js')) //json文件输出位置
    .pipe(reload({
      stream: true
    }));
});

//html内替换css、js文件名
gulp.task('rev', () => {
  return gulp.src(['' + buildDir + '/rev/**/*.json', '' + buildDir + '/*.html'])
    .pipe(revCol({
      replaceReved: true
    }))
    .pipe(gulp.dest(buildDir))
});

//css 编译及压缩、添加版本号
gulp.task('css', () => {
  return gulp.src('src/css/*.css')
    .pipe(minifyCss())
    .pipe(rev())
    .pipe(gulp.dest('' + buildDir + '/css'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('' + buildDir + '/rev/css'))
    .pipe(reload({
      stream: true
    }));
});

//stylus 编译及压缩、添加版本号
gulp.task('stylus', function () {
  return gulp.src('src/css/*.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(rev())
    .pipe(gulp.dest('' + buildDir + '/css'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('' + buildDir + '/rev/styl'))
    .pipe(reload({
      stream: true
    }));
});

//图片压缩
gulp.task('img', () => {
  return gulp.src('src/images/*')
    .pipe(minifyImg({
      use: [imageminPngquant(), imageminJpegtran()]
    }))
    .pipe(gulp.dest('' + buildDir + '/images'))
    .pipe(reload({
      stream: true
    }));
});

//html压缩
gulp.task('html', ['js', 'css'], () => {
  return gulp.src('src/*.html')
    .pipe(minifyHtml({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(buildDir))
    .pipe(reload({
      stream: true
    }));
});

//复制文件
gulp.task('copy', () => {
  return gulp.src('src/static/**/*')
    .pipe(gulp.dest(buildDir + '/static'))
    .pipe(reload({
      stream: true
    }));
});

//监听文件变化
gulp.task('watch', () => {
  gulp.watch('src/js/*.js', gulpSync.sync(['clean_js', 'js', 'rev']));
  gulp.watch('src/css/*.css', gulpSync.sync(['clean_css', 'css', 'stylus', 'rev']));
  gulp.watch('src/css/*.styl', gulpSync.sync(['clean_css', 'css', 'stylus', 'rev']));
  gulp.watch('src/images/*', ['img']);
  gulp.watch('src/static/**/**', gulpSync.sync(['clean_static', 'copy']));
  gulp.watch('src/*.html', gulpSync.sync(['html', 'rev']));
});

//本地服务
gulp.task('server', gulpSync.sync(['watch', 'rev']), () => {
  browserSync.init({
    server: {
      baseDir: './' + buildDir + '',
    },
    port: 3000
  });
});

//打包
gulp.task('build', gulpSync.sync(['clean', 'html', 'js', 'css', 'stylus', 'copy', 'img', 'rev']));