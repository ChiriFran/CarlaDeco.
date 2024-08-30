var novedadesBtn = document.getElementById("novedadesCallToAction");
var novedadesForm = document.getElementById("novedadesForm");
var cerrarNovedades = document.getElementById("cerrarNovedades");
var cerrarDefinitivoBtn = document.getElementById("cerrarDefinitivoBtn");
var novedadesTitulo = document.querySelector(".novedadesTitulo");

// Función para verificar si el formulario ya fue completado previamente
function verificarFormularioCompletado() {
  return localStorage.getItem("formularioCompletado") === "true";
}

// Función para marcar el formulario como completado en localStorage
function marcarFormularioCompletado() {
  localStorage.setItem("formularioCompletado", "true");
}

// Ocultar el botón de llamada a la acción si el formulario ya ha sido completado previamente al cargar la página
window.addEventListener("load", function () {
  if (verificarFormularioCompletado()) {
    novedadesBtn.style.display = "none";
  }
});

// Función para abrir el contenedor del formulario
function Abrir() {
  // Verificar si el formulario ya está visible y si ya fue completado previamente
  if (
    novedadesForm.style.visibility === "visible" ||
    verificarFormularioCompletado()
  ) {
    // Si está visible o ya fue completado, no hacer nada
    return;
  }

  novedadesForm.style.cssText = `
    position: relative;
    visibility: visible;
  `;
  novedadesForm.classList.add("novedadesSlide");
  novedadesBtn.style.cssText = `
    width: 200px;
    height: 280px;
  `;
}

function CerrarProvisorio() {
  novedadesForm.style.cssText = `
    position: absolute;
    visibility: hidden;
  `;
  novedadesForm.classList.remove("novedadesSlide");
  novedadesBtn.style.cssText = `
    width: auto;
    height: auto;
  `;
}

function CerrarDefinitivo() {
  document.getElementById("novedadesCallToAction").style.display = "none";
  document.removeEventListener("click", cerrarProvisorioHandler);
}

function cerrarProvisorioHandler(event) {
  var isClickInsidePopup = novedadesForm.contains(event.target);
  var isClickInsideBtn = novedadesBtn.contains(event.target);

  if (isClickInsidePopup || isClickInsideBtn) {
    return;
  }

  if (novedadesForm.style.visibility === "visible") {
    CerrarProvisorio();
  }
}

// Definir el manejador del evento de click del botón novedadesBtn
function novedadesBtnClickHandler() {
  if (
    novedadesForm.style.visibility === "hidden" ||
    novedadesForm.style.visibility === ""
  ) {
    Abrir();
  }
}

// Agregar el manejador del evento de click del botón novedadesBtn si el formulario aún no ha sido completado
if (!verificarFormularioCompletado()) {
  novedadesBtn.addEventListener("click", novedadesBtnClickHandler);
}

cerrarNovedades.addEventListener("click", () => {
  CerrarDefinitivo();
});

document.addEventListener("click", cerrarProvisorioHandler);

novedadesForm.addEventListener("click", function (event) {
  if (
    event.target.tagName.toLowerCase() === "input" ||
    event.target.tagName.toLowerCase() === "textarea"
  ) {
    event.stopPropagation();
  }
});

novedadesForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Validar el contenido del input antes de mostrar el mensaje
  var inputContenido = novedadesForm
    .querySelector("input[type='text']")
    .value.trim();
  if (inputContenido === "") {
    // Si el contenido del input es incorrecto, no hacer nada
    return;
  }

  // Cambiar el contenido de .novedadesTitulo
  novedadesTitulo.textContent = "Te has suscrito.";

  // Marcar el formulario como completado en localStorage
  marcarFormularioCompletado();

  setTimeout(function () {
    // Agregar estilos dinámicamente para la transición hacia la derecha
    novedadesBtn.style.transition = "transform 1.5s ease-out";
    novedadesBtn.style.transform = "translateX(150%)";
  }, 3000); // 3000 milisegundos = 3 segundos

  CerrarProvisorio();

  // Eliminar el evento de click del botón novedadesCallToAction
  novedadesBtn.removeEventListener("click", novedadesBtnClickHandler);
});
