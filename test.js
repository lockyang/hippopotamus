//  dev test
const inquirer = require('inquirer');
const childProcess = require('child_process');
const util = require('util');
const exec = util.promisify(childProcess.exec);
const git = require('./lib/git');
const { catchError } = require('./lib/helper');
const test = async () => {
  try {
    const t = await git.push()
  } catch (err) {
    console.log(err.stderr);
    catchError(err.stderr);
  }
};

test();


