// 引入一个包
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// webpack 中所有的配置信息都应该写在 module.exports 中
module.exports = {
    // 指定入口文件
    entry: './src/index.ts',
    // 指定打包文件所在目录
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后文件的文件名
        filename: 'bundle.js',
        environment: {
            arrowFunction: false,
            const: false
        }
    },
    // 指定webpack打包时要使用的模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // test 指定的是规则生效的文件
                test: /\.ts$/,
                use: [
                    // 配置babel
                    {
                      loader: 'babel-loader',
                      // 设置babel
                      options: {
                          // 设置预定义的环境
                          presets: [
                              [
                                  "@babel/preset-env",
                                  {
                                      // 要兼容的目标浏览器
                                      targets: {
                                          "chrome": '88'
                                      },
                                      // 指定corejs的版本
                                      "corejs": '3',
                                      // 使用corejs的方式, 按需加载
                                      "useBuiltIns": "usage"
                                  }
                              ]
                          ]
                      }   
                    }
                     , 'ts-loader'],
                // 指定要排除的文件
                exclude: /node-modules/
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader",
                ]
            }
        ]
    },
    // 配置webpack的插件
    plugins: [
        new HTMLWebpackPlugin({
            // title: '自定义title'
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin()
    ],
    // 用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }
}