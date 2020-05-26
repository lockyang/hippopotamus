const childProcess = require('child_process');
const util = require('util');
const exec = util.promisify(childProcess.exec);

const remoteAdd = async ({name, url}) => {
  const command = `git remote add ${name} ${url}`
  await exec(command);
}

const catchError = async (err) => {
  const errType = {}
}


module.exports = {
  catchError,
}