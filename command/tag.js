const inquirer = require('inquirer');
const ora = require('ora');
const git = require('../lib/git');
const { generateTag } = require('../lib/helper');
const msg = require('./msg');

const tag = async () => {
  const { stdout } = await git.tagList();
  let current = '';
  let suggest = '0.1.0'
  if (stdout) {
    const list = stdout.split('\n');
    current = list[list.length - 3];
    const { level } = await inquirer.prompt({
      type: 'list',
      default: 2,
      message: '版本升级级别',
      name: 'level',
      choices: [{
        name: '主版本号：当你做了不兼容的 API 修改',
        value: 0,
      }, {
        name: '次版本号：当你做了向下兼容的功能性新增',
        value: 1,
      }, {
        name: '修订号：当你做了向下兼容的问题修正',
        value: 2,
      }]
    })
    suggest = generateTag(current, level);
  }
  const { result } = await inquirer.prompt({
    type: 'input',
    default: suggest,
    name: 'result',
    message: `当前版本号${current ? current : '为空'}`,
    validate: (input) => {
      /**
       * https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
       * 官方正则
       */
      const reg = new RegExp(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/, 'g');
      if (reg.test(input)) {
        return true
      }
      console.log('[X] 请遵循 semver 规范, https://regex101.com/r/vkijKf/1/ 也许能帮助到你')
      return false;
    }
  })

  await git.tagAdd(result);

  const { push } = await inquirer.prompt({
    type: 'confirm',
    default: true,
    name: 'push',
    message: msg.pushRemote,
  })
  if (push) {
    const doing = ora(msg.pushing).start();
    await git.tagPush(result);
    doing.stop();
    console.log(msg.pushSuccess);
  }
}

module.exports = {
  tag: tag,
}