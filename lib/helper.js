/**
 * https://semver.org/
 * MAJOR version when you make incompatible API changes,
 * MINOR version when you add functionality in a backwards compatible manner, and
 * PATCH version when you make backwards compatible bug fixes.
 */

const trimLeft = s => s.replace(/(^\s*)/g, '');
const trimRight = s => s.replace(/(\s*$)/g, '');
const trim = s => trimLeft(trimRight(s));

/**
 * ['major', 'minor', 'patch']
 */
const generateTag = (currentTag, level = 2) => {
  const { input } = currentTag.match(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/);
  if (input){
    let current = input.split('.');
    current[level] =  Number(current[level]) + 1;
    return current.join('.');
  }
  return '';
}

const catchError = (stderr) => {
  const err = stderr.split('\n\n');
  console.log(err);
  if (err.length > 0) {
    const findSuggest = err.find(i => trim(i).match(/^git\s(push|add)/))
    console.log(findSuggest);
  }

}

module.exports = {
  generateTag,
  catchError,
}