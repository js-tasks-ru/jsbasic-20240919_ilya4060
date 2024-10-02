function camelize(str) {
  let arr = str.split('-').map(function(word, index) {
      return index === 0? word : word[0].toUpperCase() + word.slice(1);
  })
  return arr.join('');
}