function getMinMax(str) {
  let arr = str.split(' ')
    .map(item => parseFloat(item))
    .filter(item => !isNaN(item));
  return { min: Math.min(...arr), max: Math.max(...arr) }
}