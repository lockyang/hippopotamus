const inquirer = require('inquirer');
const git = require('../lib/git');
const ora = require('ora');
const color = require('colors/safe');
const msg = require('./msg');

const emojiList = {
  Bugfix: '🐛 [bug] ',
  NewFeature: '✨  [feature] ',
  Documentation: '📚  [document] ',
  // Refactoring: '📦  [refact] ',
  Style: '💄 [Style]',
  Tooling: '🔧  [config] ',
  Develop: '🚧 [develop]',
  Lint: '🎨 [lint]',
  Test: '✅ [Test]'
}
/**
 * 参考 https://github.com/liuchengxu/git-commit-emoji-cn
 * emoji也太他妈多了...
 */
const commitPrompt = [{
  type: 'list',
  name: 'type',
  message: '选择Commit类型',
  choices: [{
    name: '🐛  bug',
    value: 'Bugfix'
  }, {
    name: '✨  新特性',
    value: 'NewFeature'
  }, {
    name: '💄 样式修改',
    value: 'Style'
  }, {
    name: '🚧 工作进行中',
    value: 'Develop',
  }, {
    name: '📚  文档',
    value: 'Documentation'
  }, {
    name: '🔧  配置',
    value: 'Tooling'
  }, {
    name: '🎨 代码结构/格式',
    value: 'Lint'
  }, {
    name: '✅ 测试相关',
    value: 'Test',
  }]
}]

const pushPrompt = {
  type: 'confirm',
  name: 'confirmPush',
  message: '是否推送Commit到远端 ❓'
}

const describePrompt = {
  type: 'input',
  name: 'describe',
  message: '请输入commit具体描述',
  validate: input => {
    if (!input) {
      console.log(
        color.red('🚓 请简略描述commit内容')
      )
      return false;
    }
    return true;
  }
}

const commit = async () => {
  const { stdout } = await git.status();
  console.log(stdout);
  return '';
  if (!stdout) {
    return console.log(
      color.red('😿 没有需要提交的文件')
    );
  }
  await git.add();

  const { type } = await inquirer.prompt(commitPrompt);
  const { describe } = await inquirer.prompt(describePrompt);
  await git.commit(`${emojiList[type]}${describe}`);

  const { confirmPush } = await inquirer.prompt(pushPrompt);
  if (confirmPush) {
    const doing = ora(msg.pushing).start()
    await git.push();
    doing.stop();
    console.log(msg.pushSuccess);
  }
}

module.exports = {
  commit: commit,
}