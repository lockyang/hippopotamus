const inquirer = require('inquirer');
const { commit } = require('./command/commit');
const { tag } = require('./command/tag.js');

const main = async () => {
  const choose = [{
    type: 'list',
    name: 'command',
    message: '选择Git命令',
    default: '',
    choices: [{
      name: '提交代码到当前分支',
      value: 'commit',
    }, {
      name: '更新当前分支tag',
      value: 'tag',
    }]
  }]

  const result = await inquirer.prompt(choose);
  switch (result.command) {
    case 'commit':
      commit();
      break;
    case 'tag':
      tag();
      break;
    default: commit();
  }
}

main();