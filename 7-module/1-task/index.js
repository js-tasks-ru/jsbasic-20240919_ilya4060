import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.renderRibbon();
    this.addEventListeners();
  }

  renderRibbon() {
    const ribbon = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <div class="ribbon__inner"></div>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    const ribbonInner = ribbon.querySelector('.ribbon__inner');

    this.categories.forEach(category => {
      const categoryElement = createElement(`
        <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
      `);
      ribbonInner.append(categoryElement);
    });

    return ribbon;
  }

  addEventListeners() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    const arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    arrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    arrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    ribbonInner.addEventListener('scroll', () => {
      this.updateArrows(ribbonInner, arrowLeft, arrowRight);
    });

    this.elem.addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.classList.contains('ribbon__item')) {
        this.selectCategory(event.target);
      }
    });
  }

  updateArrows(ribbonInner, arrowLeft, arrowRight) {
    const scrollLeft = ribbonInner.scrollLeft;
    const scrollWidth = ribbonInner.scrollWidth;
    const clientWidth = ribbonInner.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft === 0) {
      arrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      arrowLeft.classList.add('ribbon__arrow_visible');
    }

    if (scrollRight < 1) {
      arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      arrowRight.classList.add('ribbon__arrow_visible');
    }
  }

  selectCategory(categoryElement) {
    const activeCategory = this.elem.querySelector('.ribbon__item_active');
    if (activeCategory) {
      activeCategory.classList.remove('ribbon__item_active');
    }

    categoryElement.classList.add('ribbon__item_active');

    const categoryId = categoryElement.dataset.id;
    const event = new CustomEvent('ribbon-select', {
      detail: categoryId,
      bubbles: true
    });

    this.elem.dispatchEvent(event);
  }
}