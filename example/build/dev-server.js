var config = require('../config')
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.env.NODE_ENV)
}

var path = require('path')
var express = require('express')
var webpack = require('webpack')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.port

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})

// serve webpack bundle output
app.use(devMiddleware)

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'));
})

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
    console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
})
