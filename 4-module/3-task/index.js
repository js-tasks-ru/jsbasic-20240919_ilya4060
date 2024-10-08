function highlight(table) {

let rows = table.querySelectorAll('tbody tr');
rows.forEach(row => {
  let ageCell = row.cells[1];
  let genderCell = row.cells[2];
  let statusCell = row.cells[3];
  //Status
  if (statusCell.hasAttribute('data-available')) {
    let available = statusCell.getAttribute('data-available');
    if (available === 'true') {
      row.classList.add('available');
    } else if (available === 'false') {
      row.classList.add('unavailable');
    }
  } else {
    row.hidden = true;
  }
  //Gender
  if (genderCell.textContent === 'm') {
    row.classList.add('male');
  } else if (genderCell.textContent === 'f') {
    row.classList.add('female');
  }
  //Age
  if (parseInt(ageCell.textContent) < 18) {
    row.style.textDecoration = 'line-through';
  }
});
}