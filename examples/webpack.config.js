const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

// !多入口
let entries = fs.readdirSync(__dirname).reduce((entries, dir) => {
	//console.log(entries, dir) // dir是文件名字 demo/global.css等
	const fullDir = path.join(__dirname, dir)
	const entry = path.join(fullDir, 'app.ts')
	// !console.log(fs.statSync(path).isDirectory()); // 这个用来 判断 是否目录/文件夹。
	if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
		entries[dir] = ['webpack-hot-middleware/client', entry]
	}
	return entries
}, {})
// !webpack-hot-middleware 是用来进行页面的热重载的,刷新浏览器 一般和 webpack-dev-middleware 配合使用，实现热加载功能, 在express使用这些中间件
// !简单理解：webpack-hot-middleware + webpack-dev-middleware = webpack-dev-server 
//console.log(entries)
// { 
//   demo:[ 'webpack-hot-middleware/client','H:\\vue\\ts-axios\\examples\\demo\\app.ts' ],
//   simple:[ 'webpack-hot-middleware/client','H:\\vue\\ts-axios\\examples\\simple\\app.ts' ] 
// }

module.exports = {
	mode: 'development',

	/**
	 * 我们会在 examples 目录下建多个子目录
	 * 我们会把不同章节的 demo 放到不同的子目录中
	 * 每个子目录的下会创建一个 app.ts
	 * app.ts 作为 webpack 构建的入口文件
	 * entries 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件
	 * entries 是一个对象，key 为目录名
	 */
	entry: entries,

	/**
	 * 根据不同的目录名称，打包生成目标 js，名称和目录名一致
	 */
	output: {
		path: path.join(__dirname, '__build__'),
		filename: '[name].js',
		publicPath: '/__build__/'
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				enforce: 'pre',
				use: [
					{
						loader: 'tslint-loader'
					}
				]
			},
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true
						}
					}
				]
			}
		]
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
}
