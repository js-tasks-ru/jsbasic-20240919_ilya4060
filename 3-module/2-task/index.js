function filterRange(arr, a, b) {
  let result = arr.filter(function(item) {
      return item >= a && item <= b;
  })
return result;
}
