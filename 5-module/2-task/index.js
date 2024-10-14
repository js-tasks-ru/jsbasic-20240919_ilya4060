function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  let div = document.getElementById('text');

  function handler () {
    if (div.hidden === false) {
      div.hidden = true;
    } else {
      div.hidden = false;
    }
  };

  button.addEventListener("click", handler);
}