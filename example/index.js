require('@babel/register')({
  presets: [ '@babel/env' ]
})

module.exports = require('./example')
