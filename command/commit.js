const inquirer = require('inquirer');
const git = require('../lib/git');
const ora = require('ora');

const emojiList = {
  Bugfix: '🐛 [bug] ',
  NewFeature: '✨  [feature] ',
  Documentation: '📚  [document] ',
  Refactoring: '📦  [refact] ',
  Tooling: '🔧  [config] ',
}

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
    name: '📚  文档',
    value: 'Documentation'
  }, {
    name: '📦  重构',
    value: 'Refactoring'
  }, {
    name: '🔧  配置',
    value: 'Tooling'
  }]
}]

const pushPrompt = {
  type: 'confirm',
  name: 'confirmPush',
  message: '是否推送到远端'
}

const describePrompt = {
  type: 'input',
  name: 'describe',
  message: '请输入commit具体描述',
  validate: input => {
    if (!input) {
      console.log('请简略描述commit内容')
      return false;
    }
    return true;
  }
}

const commit = async () => {
  const { stdout } = await git.diffCheck();
  if (!stdout) {
    return console.log('nothing change');
  }
  await git.add();

  const { type } = await inquirer.prompt(commitPrompt);
  const { describe } = await inquirer.prompt(describePrompt);
  await git.commit(`${emojiList[type]}${describe}`);

  const { confirmPush } = await inquirer.prompt(pushPrompt);
  if (confirmPush) {
    const doing = ora('i\'m working').start()
    await git.push();
    doing.stop();
    console.log('git push 成功')
  }
}

module.exports = {
  commit: commit,
}