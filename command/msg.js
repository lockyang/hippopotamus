const color = require('colors');

const pushQuestion = '是否推送到远端 ❓';

const pushing = '🚧 正在推送到远端';

const pushSuccess = color.green('😁 成功推送到远端')

const pushFail = color.red('😢 失败了❗️')

module.exports = {
  pushQuestion,
  pushing,
  pushSuccess,
  pushFail,
}