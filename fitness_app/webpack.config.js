/* 
  webpack配置
*/
// 处理html的插件
const path = require('path') // 引入node内置模块path 处理文件路径
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
  // 入口
  entry: './src/js/index.js',

  // 出口
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: 'bundle.js' // 输出文件名
  },

  //3 loader 加载器
  module: {
    //loader的加载顺序是从后往前执行。
    rules: [
      //1 处理css   
      {
        test: /\.css$/, // 匹配所有.css文件
        use: [
          // 'style-loader', // 创建style标签 把css插入html的head内
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../" //配置图片的查找位置
            }
          },
          'css-loader',
          'postcss-loader', // 解析加载css到js中（把css打成字符串）。
        ]

      },

      //2 处理less   
      {
        test: /\.less$/, // 匹配所有.less文件
        use: [
          // 'style-loader', // 创建style标签 把css插入html的head内
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          'css-loader', // 解析加载css到js中（把css打成字符串）。
          'postcss-loader',
          'less-loader', // 把less文件翻译成为css文件 
        ]
      },

      // 处理图片   
      {
        test: /\.(png|jpeg|jpg|gif)$/, // 匹配所有图片文件
        loader: "url-loader",
        options: {
          name: '[hash:8].[ext]', // 图片输出的名字hash长度16位 默认32位
          limit: 10 * 1024, // 小于10kb base64处理
          // 关闭url-loader的es Module  使用commonjs module解析 , url-loader默认使用es6模块化解析 而后续使用 html-loader 引入图片是 commonjs  不关闭会报错
          esModule: false,
          outputPath: 'images' // 输出路径
        }
      },

      // 处理html中的图片 把html中的图片拷到dist目录中  
      {
        test: /\.html$/, // 匹配所有.html文件
        loader: "html-loader",
      },

      // 字体
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, // 处理字体格式文件
        loader: 'file-loader',
        options: {
          name: '[hash:8].[ext]', // 输出名字
          outputPath: 'fonts' // 输出路径
        }
      },

      // es6转换为es5
      {
        test: /\.js$/,
        loader: 'babel-loader', // loader 编译es6为es5
        exclude: /node_modules/ // 排除
      },
    ]
  },

  // 插件处理html文件
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
  ],

  // 模式： development: 开发模式  production: 生产模式
  mode: 'development',

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
    compress: true, // 启动gzip
    port: 666, // 端口
    open: true, // 自动打开服务
    publicPath: '/', // 默认dist就是服务器根目录 从根目录查找资源
    openPage: 'index.html', // 打开的页面
  },

}