/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = this.createTable(rows);
  }

  createTable(rows) {
    const table = document.createElement('table'); //элемент таблицы
    const thead = document.createElement('thead'); //заголовок
    thead.innerHTML = `
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>`;

    table.appendChild(thead);

    const tbody = document.createElement('tbody'); //тело таблицы

    for (let row of rows) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <tr>
          <td>${row.name}</td>
          <td>${row.age}</td>
          <td>${row.salary}</td>
          <td>${row.city}</td>
          <td><button>X</button></td>
        </tr>`;
    
    const delButton = tr.querySelector('button');
    delButton.addEventListener('click', () => {
      tr.remove();
    });

      tbody.appendChild(tr);
    }

    table.appendChild(tbody);

    return table;
  }
}