// webpack配置
// 处理html的插件
const path = require('path') // 引入node内置模块path 处理文件路径
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
  // 1 入口
  entry: {
    // 公共的css
    common_css: "./src/js/common_css.js",

    // 公共的js
    dom: "./src/js/common_js/dom.js",
    utils: "./src/js/common_js/utils.js",

    // 页面的模块
    advertisement: "./src/js/advertisement.js", //广告
    login: "./src/js/login.js", //登录
    register: "./src/js/register.js", //注册
    index: "./src/js/index.js", //首页
    sports: "./src/js/sports.js", //运动
    sports_train: "./src/js/sports_train.js", //运动-训练
    social: "./src/js/social.js", //圈子
    mine: "./src/js/mine.js", //我的
    mine_info: "./src/js/mine_info.js", //我的-资料
    mine_data: "./src/js/mine_data.js", //我的-数据
    mine_badge: "./src/js/mine_badge.js", //我的-徽章
  },

  // 2 出口
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: "js/[name]-[hash:8].js" // 输出文件名
  },

  // 3 loader 加载器
  module: {
    // loader的加载顺序是从后往前执行。
    rules: [
      // 1 处理css   
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
          'css-loader', // 解析加载css到js中（把css打成字符串）
          'postcss-loader',
        ]
      },

      // 2 处理less   
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

      // 3 处理图片   
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

      // 4 处理html中的图片 把html中的图片拷到dist目录中  
      {
        test: /\.html$/, // 匹配所有.html文件
        loader: "html-loader",
      },

      // 5 字体
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, // 处理字体格式文件
        loader: 'file-loader',
        options: {
          name: '[hash:8].[ext]', // 输出名字
          outputPath: 'fonts' // 输出路径
        }
      },

      // 6 es6转换为es5
      {
        test: /\.js$/,
        loader: 'babel-loader', // loader 编译es6为es5
        exclude: /node_modules/ // 排除
      },
    ]
  },

  // 4 插件处理html文件
  plugins: [
    // 抽取css
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash:8].css'
    }),

    // advertisement.html
    new HtmlWebpackPlugin({
      template: "./src/pages/advertisement.html",
      filename: "advertisement.html",
      chunks: ["advertisement", "common_css", "dom", "utils"]
    }),

    // login.html
    new HtmlWebpackPlugin({
      template: "./src/pages/login.html",
      filename: "login.html",
      chunks: ["login", "common_css", "dom", "utils"]

    }),

    // register.html
    new HtmlWebpackPlugin({
      template: "./src/pages/register.html",
      filename: "register.html",
      chunks: ["register", "common_css", "dom", "utils"]
    }),

    // index.html
    new HtmlWebpackPlugin({
      template: "./src/pages/index.html",
      filename: "index.html",
      chunks: ["index", "common_css", "dom", "utils"]
    }),

    // sports.html
    new HtmlWebpackPlugin({
      template: "./src/pages/sports.html",
      filename: "sports.html",
      chunks: ["sports", "common_css", "dom", "utils"]
    }),

    // sports_train.html
    new HtmlWebpackPlugin({
      template: "./src/pages/sports_train.html",
      filename: "sports_train.html",
      chunks: ["sports_train", "common_css", "dom", "utils"]
    }),

    // social.html
    new HtmlWebpackPlugin({
      template: "./src/pages/social.html",
      filename: "social.html",
      chunks: ["social", "common_css", "dom", "utils"]
    }),

    // mine.html
    new HtmlWebpackPlugin({
      template: "./src/pages/mine.html",
      filename: "mine.html",
      chunks: ["mine", "common_css", "dom", "utils"]
    }),

    // mine_info.html
    new HtmlWebpackPlugin({
      template: "./src/pages/mine_info.html",
      filename: "mine_info.html",
      chunks: ["mine_info", "common_css", "dom", "utils"]
    }),

    // mine_data.html
    new HtmlWebpackPlugin({
      template: "./src/pages/mine_data.html",
      filename: "mine_data.html",
      chunks: ["mine_data", "common_css", "dom", "utils"]
    }),

    // mine_badge.html
    new HtmlWebpackPlugin({
      template: "./src/pages/mine_badge.html",
      filename: "mine_badge.html",
      chunks: ["mine_badge", "common_css", "dom", "utils"]
    }),
  ],

  // 5 模式： development: 开发模式  production: 生产模式
  mode: 'development',

  // 6 配置开发服务器
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
    compress: true, // 启动gzip
    port: 666, // 端口
    open: true, // 自动打开服务
    publicPath: '/', // 默认dist就是服务器根目录 从根目录查找资源
    openPage: 'advertisement.html', // 打开的页面
  }
}