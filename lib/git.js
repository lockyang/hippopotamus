'use strict'
const childProcess = require('child_process');
const util = require('util');
const exec = util.promisify(childProcess.exec);

const gitAdd = async () => {
  const command = 'git add .';
  console.log(`在${process.cwd()}执行${command}`);
  await exec(command);
}

const gitCommit = async (message) => {
  const command = `git commit -m "${message}"`
  await exec(command);
}

const gitPush = async () => {
  const command = 'git push'
  await exec(command);
}

module.exports = {
  gitAdd,
  gitCommit,
  gitPush,
}