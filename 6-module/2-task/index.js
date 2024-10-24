import createElement from '../../assets/lib/create-element.js';

class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = createElement (`
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
          <span class="card__price">€${this.product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.product.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);

    //событие при клике на "+"
    const addButton = this.elem.querySelector('.card__button');
    addButton.addEventListener('click', () => {
      this.evAddProduct();
    });
  }

  //генерируем пользовательское событие "product-add"
  evAddProduct() {
    const addProduct = new CustomEvent('product-add', {
      detail: this.product.id, // Уникальный идентификатора товара из объекта товара
      bubbles: true //это событие всплывает
    });
    
    this.elem.dispatchEvent(addProduct);
  }
}

export default ProductCard;