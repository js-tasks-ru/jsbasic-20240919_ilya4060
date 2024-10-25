import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modalElement = this.render();
    this.closeEsc = this.closeEsc.bind(this);
  }

  render() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>`
    ;
    return modal;
  }

  // открытие модального окна
  open() {
    document.body.append(this.modalElement);
    document.body.classList.add('is-modal-open');

    // обработчики для закрытия окна
    this.modalElement.querySelector('.modal__close').addEventListener('click', () => this.close());
    document.addEventListener('keydown', this.closeEsc);
  }

  // закрытие модального окна
  close() {
    this.modalElement.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.closeEsc);
  }

  // закрытие модального окна по клавише Esc
  closeEsc(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }

  // установка заголовка модального окна
  setTitle(title) {
    this.modalElement.querySelector('.modal__title').textContent = title;
  }

  // установка содержимого модального окна
  setBody(node) {
    const modalBody = this.modalElement.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.append(node);
  }
}
