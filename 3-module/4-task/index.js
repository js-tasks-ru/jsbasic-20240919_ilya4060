function showSalary(users, age) {
  let searchResult = users.filter(user => user.age <= age);
  let results = [];
  
  if (searchResult.length > 0) {
    searchResult.forEach(user => {
      let result = `${user.name}, ${user.balance}`;
      results.push(result);
    });
    return results.join('\n');
    
  } else {
    return 'No users found';
  };
}

//2 способ, сократил используя метод map для результатов фильтрации

function showSalary(users, age) {
  let search = users.filter(user => user.age <= age);
  if (search.length > 0) {
    return search.map(user => `${user.name}, ${user.balance}`).join('\n');
  }
  return 'No users found';
}
