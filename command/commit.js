const inquirer = require('inquirer');
const { gitAdd, gitCommit, gitPush } = require('../lib/git');

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
  message: '是否push到远端'
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
  await gitAdd();

  const { type } = await inquirer.prompt(commitPrompt);
  const { describe } = await inquirer.prompt(describePrompt);
  await gitCommit(`${emojiList[type]}${describe}`);

  const { confirmPush } = await inquirer.prompt(pushPrompt);
  if (confirmPush) {
    await gitPush();
    console.log('git push 成功')
  }
}

module.exports = {
  commit: commit,
}