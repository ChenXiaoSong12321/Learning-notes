// 引入gulp
import gulp from 'gulp';
// 引入gulp-if，gulp语句中做if判断的
import gulpif from 'gulp-if';
// gulp中处理文件拼接的
import concat from 'gulp-concat';
// 打包
import webpack from 'webpack';
// gulp处理文件流，结合webpack-stream来处理
import gulpWebpack from 'webpack-stream';
// 重命名做标志的
import named from 'vinyl-named';
// 文件修改后浏览器自动刷新，热更新
import livereload from 'gulp-livereload';
// 处理文件信息流的
import plumber from 'gulp-plumber';
// 对文件重命名的
import rename from 'gulp-rename';
// 压缩js、css
import uglify from 'gulp-uglify';
// 命令行工具输出的包
import {log,colors} from 'gulp-util';