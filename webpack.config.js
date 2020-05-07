
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');




function _readDir(p, exclude = []){
    return fs.readdirSync(path.resolve(p))
    .filter(dirname=>!exclude.includes(dirname))
    .filter(dirname=>fs.statSync(path.resolve(p, dirname)).isDirectory())
}
let jssrc = 'src';//js目录
let dirs = _readDir(jssrc);

module.exports = function(){
    return {
        entry: dirs.reduce((pre, next)=>Object.assign(pre, {
            [`${next}/index`]: path.resolve(jssrc, next, 'index')
        }), {}),
        output: {
            path: path.resolve(__dirname, 'static'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {test: /\.js$/, use: 'babel-loader'},
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    })
                 }
            ]
        },
        // resolve: {
        //     extensions: ['', '.js', '.vue'],
        //     alias: {
        //         'scss@': path.resolve(__dirname, './scss'),
        //         'src@': path.resolve(__dirname, './src'),
        //     }
        // },
        plugins: [
            new ExtractTextPlugin('style.css'),
        ]
    }
}

