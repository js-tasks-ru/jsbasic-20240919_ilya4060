function hideSelf() {
  let button = document.querySelector('.hide-self-button');

  function handler () {
    button.hidden = true;
  };

  button.addEventListener("click", handler);
}