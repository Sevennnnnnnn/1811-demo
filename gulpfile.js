const gulp = require('gulp')
const config = require('./config')
const htmlmin = require('gulp-htmlmin')
const connect = require('gulp-connect')
// 合并文件
const concat = require('gulp-concat')
// 压缩css
const minifycss = require('gulp-minify-css')
// 给css加前缀
const autoprefixer = require('gulp-autoprefixer')
// 重命名
const rename = require('gulp-rename')
// 合并文件操作流
const merge = require('merge-stream')
// 小型webpack
const webpack = require('webpack-stream')
// 自动引入依赖文件
const inject = require('gulp-inject')
// 编译sass
const sass = require('gulp-sass')
gulp.task('handle:html', function () {
    return gulp.src('./src/views/*/*.html')
        // .pipe(htmlmin(config.htmloptions))
        .pipe(gulp.dest('./dist/html'))
})
gulp.task('handle:css', function () {
    // 1. 希望可以合并成多个css，更灵活  2. 多页面灵活处理
   let streams = [] //存放下面多个文件流的数组
    for (const page in config.cssoptions) { // 遍历多个页面
        for (const file in config.cssoptions[page]) { // 遍历各个页面中的多个打包css文件配置
            let stream = gulp.src(config.cssoptions[page][file])
                .pipe(sass({outputStyle: 'compressed'}))// 把scss编译成css
                .pipe(autoprefixer({// 自动加前缀
                    browsers: ['last 2 versions','Safari >0', 'Explorer >0', 'Edge >0', 'Opera >0', 'Firefox >=20'],//last 2 versions- 主流浏览器的最新两个版本
                    cascade: false, //是否美化属性值 默认：true 像这样：
                    //-webkit-transform: rotate(45deg);
                    //        transform: rotate(45deg);
                    remove:true //是否去掉不必要的前缀 默认：true 
                }))
                .pipe(concat(file + '.css')) // 合并文件
                .pipe(minifycss()) // 压缩文件
                .pipe(rename({suffix:'.min'})) //重命名
                .pipe(gulp.dest('./dist/'+ page +'/css')) // 输出到对应的目录中
            
           streams.push(stream) // 把当前的文件流存储到数组中
        }
    }
    return merge( ...streams )//合并多个文件流
    // ... 是es6 中的展开运算符 var  a = [1,2,3,4]  var b = [ ...a, 5,6,7] // b: [1,2,3,4,5,6,7]
    // var a = { x: 1, y: 2 } var b = { z: 3, ...a } // b: { x: 1, y: 2, z: 3 }
})
// 处理js es6-> es5 合并 压缩

gulp.task('handle:js', function () {
    // return gulp.src('src/entry.js')//这里瞎写一个就行
    //     //真正的处理都是在这里的
    //     .pipe(webpack({
    //         mode: 'production', // 设置打包模式： none development production(会压缩代码)
    //         //单入口 单出口
    //         // entry: './src/views/index/javascripts/index.js',// 入口
    //         // output: {
    //         //     filename: 'index.js'
    //         // }
    //         //多入口 单出口 数组中，谁在前面，打包的时候也在前面
    //         // entry: ['./src/views/index/javascripts/index.js','./src/views/index/javascripts/vendor.js'],// 入口
    //         // output: {
    //         //     filename: 'index.js'
    //         // }
    //         // 多入口 多出口
    //         entry: {
    //             index: './src/views/index/javascripts/index.js',
    //             vendor: './src/views/index/javascripts/vendor.js'
    //         }, // 入口
    //         output: {
    //             filename: '[name].min.js' // [name]代表在entry中键名是什么，打包出来的就是什么
    //         }
    //     }))
    //     .pipe(gulp.dest('./dist/index/js'))

    let streams = []
    for (const page in config.jsoptions) {
        //判断如果入口是数组或者是字符串的话就是单出口，否则是多出口
        let entry = config.jsoptions[page]
        let filename = Array.isArray(entry) || ((typeof entry) === 'string') ? page : '[name]'
        let stream = gulp.src('src/entry.js')
            .pipe(webpack({
                mode: 'production',
                entry: entry,
                output: { filename: filename+'.min.js' },
                module: {
                    rules: [ //webpack中在这里使用各种loader对代码进行各种编译
                        {
                            test: /\.js$/, // 对js文件进行处理
                            loader: 'babel-loader', // 使用babel-loader对其进行处理
                            query: {
                                presets: ['es2015'] // 将es6编译一下
                            }
                        }
                    ]
                }
            }))
            .pipe(gulp.dest('./dist/' + page + '/js'))
        streams.push(stream)
    }

    return merge( ...streams )

})


//专门给各个页面的html文件添加对应的依赖
gulp.task('inject', function () {
        console.log(config.pages)
        let streams = config.pages.map(page => {
            var target = gulp.src('./dist/html/'+page+'/'+page+'.html');
            // It's not necessary to read the files (will speed up things), we're only after their paths:
            var sources = gulp.src(['./dist/'+page+'/js/*.js', './dist/'+page+'/css/*.css'], {read: false});
            console.log(target)
            return target.pipe(inject(sources, { ignorePath: '/dist' }))
            .pipe(gulp.dest('./dist/'+page));
            
        })

        return merge(...streams)
    
});


gulp.task('watch',function(){
    gulp.watch('./src/views/*/*.html',['handle:html','inject','reload'])
    gulp.watch('./src/**/*.scss', ['handle:css', 'inject','reload'])
    gulp.watch('./src/**/*.js', ['handle:js','inject', 'reload'])
})

gulp.task('server', function () {
    connect.server(config.serveroptions)
})

gulp.task("reload", function(){
	return gulp.src("./dist/**/*.html")
		.pipe(connect.reload());
})
gulp.task('default',['server','handle:html','handle:css','handle:js', 'inject', 'watch'])