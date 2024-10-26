export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
    this.addEventListeners();
  }

  render() {
    const slider = document.createElement('div');
    slider.classList.add('slider');
    slider.innerHTML = `
      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: 0%;"></div>
      <div class="slider__steps"></div>`
    ;

    const stepsContainer = slider.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement('span');
      if (i === this.value) {
        step.classList.add('slider__step-active');
      }
      stepsContainer.append(step);
    }

    return slider;
  }

  addEventListeners() {
    this.elem.addEventListener('click', (event) => this.sliderClick(event));
  }

  sliderClick(event) {
    const sliderRect = this.elem.getBoundingClientRect();
    const clickX = event.clientX - sliderRect.left;
    const segmentWidth = sliderRect.width / (this.steps - 1);
    const newStep = Math.round(clickX / segmentWidth);

    if (newStep === this.value) return;

    this.value = newStep;
    this.updateSliderUI();
    this.sliderChange();
  }

  updateSliderUI() {
    const leftPercents = (this.value / (this.steps - 1)) * 100;

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const sliderValue = this.elem.querySelector('.slider__value');
    const steps = this.elem.querySelectorAll('.slider__steps span');

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    sliderValue.textContent = this.value;

    this.elem.querySelector('.sliderstep-active')?.classList.remove('sliderstep-active');
    steps[this.value].classList.add('slider__step-active');
  }

  sliderChange() {
    const sliderChangeEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(sliderChangeEvent);
  }
}