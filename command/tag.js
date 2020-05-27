const inquirer = require('inquirer');
const ora = require('ora');
const git = require('../lib/git');
const util = require('../lib/util');

const tag = async () => {
  const { stdout } = await git.tagList();
  let current = '';
  let suggest = '0.1.0'
  if (stdout) {
    current = stdout.split('\n\r')[0];
    util(current);
  }
  const { result } = await inquirer.prompt({
    type: 'input',
    default: suggest,
    name: 'result',
    message: `当前版本号${current ? current : '为空'}`,
    // validate: () => {

    // }
  })

  const { msg } = await inquirer.prompt({
    type: 'input',
    name: 'msg',
    message: '请输入附注内容',
  })

  await git.tagAdd(result);

  const { push } = await inquirer.prompt({
    type: 'confirm',
    default: true,
    name: 'push',
    message: '是否推送tag到远端'
  })
  if (push) {
    await git.tagPush();
  }
}

module.exports = {
  tag: tag,
}