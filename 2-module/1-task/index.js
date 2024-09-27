function sumSalary(obj) {
  let sum = 0;
  for (key in obj) {
    if (typeof obj[key] === 'number' && !isNaN(obj[key]) && isFinite(obj[key])) {
      sum += obj[key];
    }
  }
  return sum;
}