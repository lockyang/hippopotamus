'use strict'
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
  // console.log(`在${process.cwd()}执行${command}`);
  await exec(command);
}

const commit = async (message) => {
  const command = `git commit -m "${message}"`
  await exec(command);
}

const branch = async (option = '-a') => {
  const command = `git branch ${option}`;
  return await exec(command);
}

const push = async () => {
  const command = 'git push'
  return await exec(command);
}


const remote = async () => {
  const command = 'git remote';
  return await exec(command);
}

const tagList = async () => {
  return await exec('git tag')
}

const tagAdd = async (tag) => {
  return await exec(`git tag ${tag}`)
}

/**
 * https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE
 * 默认情况下，git push 命令并不会传送标签到远程仓库服务器上。
 * 在创建完标签后你必须显式地推送标签到共享服务器上。
 * 这个过程就像共享远程分支一样——你可以运行 git push origin <tagname>。
 */
const tagPush = async (tag) => {
  return await exec(`git push origin ${tag}`);
}

const branchLoaclDelete = async (branch) => {
  return await exec(`git branch -D ${branch}`);
}

const branchRemoteDelete = async (branch) => {
  return await exec(`git push origin --delete ${branch}`);
}

module.exports = {
  diffCheck,
  add,
  commit,
  push,
  remote,
  tagList,
  tagAdd,
  tagPush,
  branchLoaclDelete,
  branchRemoteDelete,
}