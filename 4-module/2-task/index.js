function makeDiagonalRed(table) {
  let table = document.querySelector('table');

  for (let i = 0; i < table.rows.length; i++) {
    let cell = table.rows[i].cells[i];
    cell.style.backgroundColor = 'red';
  }
}