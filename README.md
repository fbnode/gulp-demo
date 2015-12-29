1、安装node，登录nodejs官网https://nodejs.org/en/，选择稳定版一键安装。安装后运行node -v，查看是否安装。
2、yeoman是Google的团队和外部贡献者团队合作开发的，他的目标是通过Grunt（一个用于开发任务自动化的命令行工具）和Bower（一个HTML、CSS、Javascript和图片等前端资源的包管理器）的 
       包装为开发者创建一个易用的工作流。Yeoman的目的不仅是要为新项目建立工作流，同时还是为了解决前端开发所面临的诸多严重问题，例如零散的依赖关系。
      yeoman主要包括三部分：<1>、脚手架工具 ：yo
                                                 <2>、包管理工具：bower
                                                  <3>、构建工具： gulp或grunt
        这里我们选用：yo+bower+gulp
 3、yeoman工具安装：
npm install -g yo
bower：npm install -g bower
glup：npm install -g gulp
查看是否安装： yo --version&&bower --version&&gulp --version
注：单独查看时，bower、gulp都可以用-v，而yo是--version
4、安装gulp generator：npm install -g generator-gulp-webapp
                         生成项目：yo gulp-webapp  生成后的项目有许多常用的gulp插件，也可以根据自己的需求进行增删。。。
5、按照自己的需求修改gulpfile.js
