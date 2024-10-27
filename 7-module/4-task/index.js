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

    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', (event) => this.thumbPointerDown(event));
  }

  sliderClick(event) {
    const newStep = this.calculateStep(event.clientX);
    if (newStep === this.value) return;

    this.setValue(newStep);
    this.sliderChange();
  }

  thumbPointerDown(event) {
    event.preventDefault();
    document.addEventListener('pointermove', this.pointerMove);
    document.addEventListener('pointerup', this.pointerUp);

    this.elem.classList.add('slider_dragging');
  }

  pointerMove = (event) => {
    event.preventDefault();

    const sliderRect = this.elem.getBoundingClientRect();
    let newLeft = (event.clientX - sliderRect.left) / sliderRect.width;

    if (newLeft < 0) newLeft = 0;
    if (newLeft > 1) newLeft = 1;

    const leftPercents = newLeft * 100;
    this.updateSliderUI(leftPercents);

    const newStep = Math.round(newLeft * (this.steps - 1));
    if (newStep !== this.value) {
      this.value = newStep;
      this.updateSliderUI(leftPercents);
    }
  }

  pointerUp = () => {
    this.elem.classList.remove('slider_dragging');
    this.sliderChange();

    document.removeEventListener('pointermove', this.pointerMove);
    document.removeEventListener('pointerup', this.pointerUp);
  }

  calculateStep(clientX) {
    const sliderRect = this.elem.getBoundingClientRect();
    const relativePosition = (clientX - sliderRect.left) / sliderRect.width;
    return Math.round(relativePosition * (this.steps - 1));
  }

  setValue(newStep) {
    this.value = newStep;
    this.updateSliderUI();
  }

  updateSliderUI(leftPercents = (this.value / (this.steps - 1)) * 100) {
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