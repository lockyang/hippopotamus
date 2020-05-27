/**
 * https://semver.org/
 * MAJOR version when you make incompatible API changes,
 * MINOR version when you add functionality in a backwards compatible manner, and
 * PATCH version when you make backwards compatible bug fixes.
 */
const tagType = ['major', 'minor', 'patch'];

const generateTag = (currentTag, type = 'patch') => {
  const [tag, msg] = currentTag.split('-');
  let [major, minor, patch] = tag.split('.');
  console.log([type])
  return [major, minor, patch].join('.');
}

module.exports = {
  generateTag,
}