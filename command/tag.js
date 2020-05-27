const git = require('../lib/git');

const tag = async () => {
  const { stdout, stderr } = await git.tagList();
  console.log('tag');
}

module.exports = {
  tag: tag,
}