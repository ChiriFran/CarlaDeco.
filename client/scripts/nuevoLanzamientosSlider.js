const sliderNew = document.getElementById('slider-new');
const slidesNew = document.querySelectorAll('.slide-new');
const controlsContainerNew = document.getElementById('controls-new');
let indexNew = 0;
let intervalIdNew;

function showSlideNew() {
  sliderNew.style.transform = `translateX(${-indexNew * 100 / slidesNew.length}%)`;
}

function goToSlideNew(i) {
  indexNew = i;
  restartIntervalNew();
  showSlideNew();
  updateControlsNew();
}

function updateControlsNew() {
  const controlsNew = document.querySelectorAll('.slider-control-new');
  controlsNew.forEach((controlNew, i) => {
    if (i === indexNew) {
      controlNew.classList.add('active');
    } else {
      controlNew.classList.remove('active');
    }
  });
}

function createControlsNew() {
  slidesNew.forEach((slideNew, i) => {
    const controlNew = document.createElement('span');
    controlNew.classList.add('slider-control-new');
    controlNew.addEventListener('click', () => {
      goToSlideNew(i);
    });
    controlsContainerNew.appendChild(controlNew);
  });
  updateControlsNew();
}

function nextSlideNew() {
  indexNew++;
  if (indexNew >= slidesNew.length) {
    indexNew = 0;
  }
  restartIntervalNew();
  showSlideNew();
  updateControlsNew();
}

function prevSlideNew() {
  indexNew--;
  if (indexNew < 0) {
    indexNew = slidesNew.length - 1;
  }
  restartIntervalNew();
  showSlideNew();
  updateControlsNew();
}

function restartIntervalNew() {
  clearInterval(intervalIdNew);
  intervalIdNew = setInterval(nextSlideNew, 4000);
}

intervalIdNew = setInterval(nextSlideNew, 4000); // Iniciar el intervalo

createControlsNew(); // Crear los controles de puntos

showSlideNew(); // Muestra el primer slide al cargar la página