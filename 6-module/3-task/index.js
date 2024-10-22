import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlide = 0;
    this.elem = this.renderCarousel();
    this.addEventListeners();
  }

  renderCarousel() {
    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
      </div>
    `);

    const carouselInner = carousel.querySelector('.carousel__inner');

    this.slides.forEach((slide) => {
      const slideElement = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);

      slideElement.querySelector('.carousel__button').addEventListener('click', () => {
        const addEvent = new CustomEvent('product-add', {
          detail: slide.id,
          bubbles: true
        });
        this.elem.dispatchEvent(addEvent);
      });

      carouselInner.append(slideElement);
    });

    return carousel;
  }

  addEventListeners() {
    const arrowRight = this.elem.querySelector('.carousel__arrow_right');
    const arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    const carouselInner = this.elem.querySelector('.carousel__inner');
    const totalSlides = this.slides.length;

    arrowLeft.style.display = 'none';

    arrowRight.addEventListener('click', () => {
      if (this.currentSlide < totalSlides - 1) {
        this.currentSlide++;
        this.changeArrows(arrowLeft, arrowRight, carouselInner, totalSlides);
      }
    });
    
    arrowLeft.addEventListener('click', () => {
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.changeArrows(arrowLeft, arrowRight, carouselInner, totalSlides);
      }
    });
  }

  changeArrows(arrowLeft, arrowRight, carouselInner, totalSlides) {
    const offset = -this.currentSlide * carouselInner.offsetWidth;
    carouselInner.style.transform = `translateX(${offset}px)`;

    if (this.currentSlide === 0) {
      arrowLeft.style.display = 'none';
    } else {
      arrowLeft.style.display = '';
    }

    if (this.currentSlide === totalSlides - 1) {
      arrowRight.style.display = 'none';
    } else {
      arrowRight.style.display = '';
    }
  }
}