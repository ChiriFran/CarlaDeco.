const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slider-item');

let index = 0;

function showSlide() {
slides.forEach((slide, i) => {
    if (i === index) {
    slide.style.display = 'block';
    } else {
    slide.style.display = 'none';
    }
});
}

function nextSlide() {
index++;
if (index === slides.length) {
    index = 0;
}
showSlide();
}

function prevSlide() {
index--;
if (index < 0) {
    index = slides.length - 1;
}
showSlide();
}

setInterval(nextSlide, 7000); // Cambia de slide cada 3 segundos

showSlide(); // Muestra el primer slide al cargar la página