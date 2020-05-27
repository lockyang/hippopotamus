'use strict'
const { catchError } = require('./error');

const childProcess = require('child_process');
const util = require('util');
const exec = util.promisify(childProcess.exec);

const diffCheck = async () => {
  const command = 'git diff'
  return await exec(command)
}

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

module.exports = {
  diffCheck,
  add,
  commit,
  push,
  remote,
}