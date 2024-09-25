function checkSpam(str) {
  if (str.length === 0) return str;

  let trueStr = str.toLowerCase();
  if (trueStr.includes('1xbet') || trueStr.includes('xxx')) {
    return true;
  } else {
    return false;
  }
}
