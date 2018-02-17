import gulp from 'gulp'
import uglify from 'gulp-uglify'
import watchPath from 'gulp-watch-path'
import rename from 'gulp-rename'
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
// 处理文件信息流的
import plumber from 'gulp-plumber';

// 命令行工具输出的包
import {log,colors} from 'gulp-util';

// npm install babel-preset-es2015 babel-plugin-transform-decorators-legacy babel-loader babel-core babel-preset-env gulp gulp-uglify gulp-watch-path gulp-rename gulp-if gulp-concat webpack webpack-stream vinyl-named gulp-plumber gulp-util --save-dev

gulp.task('default', ['watch'])


gulp.task('watch', ()=> {
	gulp.watch('include/*.js', function(event) {
		let paths = watchPath(event, 'include', 'include/min')
		paths.es5 = 'include/es5/'
		gulp.src(paths.srcPath)
			.pipe(plumber({
				errorHandle:function(){

				}
			}))
			// 重命名
			.pipe(named())
			// 对js进行编译
			.pipe(gulpWebpack({
				module:{
					loaders:[{
						test:/\.js$/,
						loader:'babel-loader'
					}]
				}
			}),null,(err,stats)=>{
				// 对错误的处理
				log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
					chunks:false
				}))
			})
			// 文件放在哪里，把编译好的文件放在这个路径
			.pipe(gulp.dest(paths.es5))
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify()) //paths.distDir为目录文件
			.pipe(gulp.dest(paths.distDir))
	})
})