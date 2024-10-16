function initCarousel() {
  const carousel = document.querySelector('.carousel__inner');
  const slide = document.querySelectorAll('.carousel__slide');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');

  let currentSlide = 0; // индекс текущего слайда
  const totalSlides = slide.length; // количество слайдов
  const slideWidth = slide[0].offsetWidth; // ширина одного слайда

  //При открытии страницы на 1 слайде стрелка влево по умолчанию скрыта
  arrowLeft.style.display = 'none';

  // Функция для смены отображения стрелок
  function changeArrows() {
    if (currentSlide === 0) {
      arrowLeft.style.display = 'none';
    } else {
      arrowLeft.style.display = '';
    }
    
    if (currentSlide === totalSlides - 1) {
      arrowRight.style.display = 'none';
    } else {
      arrowRight.style.display = '';
    }
  }

  // Обработчик для стрелки вправо
  arrowRight.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      let offset = - currentSlide * slideWidth;
      carousel.style.transform = `translateX(${offset}px)`;
      changeArrows();
    }
  });

  // Обработчик для стрелки влево
  arrowLeft.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      let offset = - currentSlide * slideWidth;
      carousel.style.transform = `translateX(${offset}px)`;
      changeArrows();
    }
  });
}
