/*加载模块*/
var gulp = require('gulp'),
uglify = require('gulp-uglify'),
minifycss = require('gulp-minify-css'),
imagemin = require('gulp-imagemin'),
jshint = require('gulp-jshint'),
concat = require('gulp-concat')
rename = require('gulp-rename'),
clean = require('gulp-clean'),
notify = require('gulp-notify'),
del = require('del');

/*压缩js文件*/  
gulp.task('minifyjs',function(){
  gulp.src(['**/*.js','!**/*.min.js'],{cwd:'app/js'})
  .pipe(uglify())
  .pipe(rename({suffix:".min"}))
  .pipe(gulp.dest('build/js'))
});

/*压缩img*/
gulp.task('minifyimg',function(){
   gulp.src('**/*',{cwd:'e:/svn_projects/ShopNC/UI/Static_pages/shop/images'})
  .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
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

/*js 语法检查*/
gulp.task('jshint',function(){
  gulp.src('**/*.js',{cwd:'app/js'})
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
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

/*清空文件、文件夹*/
gulp.task('clean',function(){
 gulp.src(['build/js/*','build/css/*','build/img/*'], {read: false})
 .pipe(clean());
})

/*删除文件*/
gulp.task('del',function(){
  del(['build/js/','build/img/','build/css/'])
});



