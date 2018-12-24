'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_PATH:'"/DevIp"',
  Wx_Path:'"http://192.168.1.114:8080/#/"',
})

