'use strict'
const { catchError } = require('./error');

const childProcess = require('child_process');
const util = require('util');
const exec = util.promisify(childProcess.exec);
/**
 * https://git-scm.com/docs/git-diff
 * 检查当前变更
 */
const diffCheck = async (commit = '') => {
  const command = `git diff ${commit}`
  return await exec(command)
}

/**
 * https://git-scm.com/docs/git-add/zh_HANS-CN
 * 提交准备暂存的内容
 */
const add = async () => {
  const command = 'git add .';
  console.log(`在${process.cwd()}执行${command}`);
  await exec(command);
}

const commit = async (message) => {
  const command = `git commit -m "${message}"`
  await exec(command);
}

const push = async () => {
  const command = 'git push'
  try {
    await exec(command);
  } catch(err) {
    catchError(err);
  }
}

const remote = async () => {
  const command = 'git remote';
  return await exec(command);
}

const tagList = async () => {
  return await exec('git tag')
}

module.exports = {
  diffCheck,
  add,
  commit,
  push,
  remote,
  tagList,
}