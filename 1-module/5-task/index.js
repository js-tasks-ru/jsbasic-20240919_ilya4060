//1 способ, с использованием конструкции if...else
function truncate(str, maxlength) {
  if (str.length > maxlength) {
    return `${str.slice(0, maxlength - 1)}…`;
  } else {
    return str;
  }
}

//2 способ, с использованием условного оператора "?"
function truncate(str, maxlength) {
  return (str.length > maxlength) ? `${str.slice(0, maxlength - 1)}…` : str;
}