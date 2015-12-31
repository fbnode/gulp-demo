/*加载模块*/
var gulp = require('gulp'),
minifyhtml = require('gulp-minify-html'),
uglify = require('gulp-uglify'),
minifycss = require('gulp-minify-css'),
imagemin = require('gulp-imagemin'),
jshint = require('gulp-jshint'),
csslint = require('gulp-csslint'),
concat = require('gulp-concat'),
rename = require('gulp-rename'),
clean = require('gulp-clean'),
notify = require('gulp-notify'),
connect = require('gulp-connect'),
watch = require('gulp-watch'),
pngquant = require('imagemin-pngquant'),
rev = require('gulp-rev');
del = require('del');

/**************************打包发布部分**************************/
/*打包发布*/
gulp.task('build',['clean:build','minifyhtml','minifycss','jshint','minifyjs','minifyimgg']);

/*压缩HTML*/
gulp.task('minifyhtml',function(){
  gulp.src('**/*.html',{cwd:'app/views'})
  .pipe(minifyhtml())
  .pipe(gulp.dest('build/views'))
});
/*压缩js文件*/  
gulp.task('minifyjs',function(){
  gulp.src(['**/*.js','!**/*.min.js'],{cwd:'app/js'})
  .pipe(uglify())
  .pipe(rename({suffix:".min"}))
  .pipe(gulp.dest('build/js'))
});

/*压缩img*/
gulp.task('minifyimg',function(){
   gulp.src('**/*',{cwd:'app/img'})
  .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
  .pipe(gulp.dest('build/img'))
  /*.pipe(notify({ message: 'Images task complete' }));*/
});

/*深度压缩img*/
gulp.task('minifyimgg',function(){
   gulp.src('**/*',{cwd:'app/img'})
  .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
  .pipe(gulp.dest('build/img'))
  /*.pipe(notify({ message: 'Images task complete' }));*/
});

/*压缩css*/
gulp.task('minifycss',function(){
 gulp.src(['**/*.css','!**/*.min.css'],{cwd:'app/css'})
 .pipe(minifycss())
 .pipe(rename({suffix:".min"}))
 .pipe(gulp.dest('build/css'))
});

/*js 检查*/
gulp.task('jshint',function(){
  gulp.src('**/*.js',{cwd:'app/js'})
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
});

/*css 检查*/
gulp.task('csslint',function(){
 gulp.src('**/*.css',{cwd:'E:/svn_projects/ShopNC/UI/Static_pages/shop/css'})
 .pipe(csslint())
 .pipe(csslint.reporter())
});

/*文件合并*/
gulp.task('concat',function(){
  gulp.src(['test.js','test1.js'],{cwd:"app/js"})
  .pipe(concat('concat.js'))
  .pipe(gulp.dest('build/js/'))
});

/*文件监测看，此处可以返回对象绑定事件*/
gulp.task('watch',function(){
  gulp.watch('app/js/*.js',function(event){
    console.log('Event type: ' + event.type); 
    console.log('Event path: ' + event.path);
  })
});

/*添加版本号*/
gulp.task('rev',function(){
   gulp.src('**/*.css',{cwd:'app/css'})
   .pipe(rev())
   .pipe(gulp.dest('build/css'))
});
/*清空文件、文件夹*/
gulp.task('clean',function(){
 gulp.src(['build/js/*','build/css/*','build/img/*'], {read: false})
 .pipe(clean());
})

/*删除文件*/
gulp.task('clean:build',function(){
  del.sync('build/*',{force:true})
});

/*默认任务*/
gulp.task('default', function() {
    gulp.start('minifyjs', 'minifycss', 'minifyimg');
});

/**************************启动服务测试部分**************************/
/*启动服务*/
gulp.task('start',['server','watchhtml'])
/*创建服务*/
gulp.task('server',function(){
   connect.server({
    root:'app',
    port:9000,
    livereload: true
   });
});
/*监测文件变化自动刷新*/
gulp.task('watchhtml',function(){
   gulp.watch('**/*.html',{cwd:'app/views'},['html'])
})

gulp.task('html', function () {
  gulp.src('**/*.html',{cwd:'app/views'})
    .pipe(connect.reload());
});


