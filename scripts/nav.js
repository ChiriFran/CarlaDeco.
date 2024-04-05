const nav = document.getElementById("nav");
const abrir = document.getElementById("abrir");
const cerrar = document.getElementById("cerrar");
const navList = document.querySelectorAll(".navList");
const body = document.body;

abrir.addEventListener("click", () => {
  nav.classList.add("navVisible");
  body.style.overflow = "hidden"; // Oculta el scroll del body cuando el nav está visible
  body.style.height = "100vh"; // Establece la altura del body al tamaño de la ventana
  body.style.width = "100vw"; // Establece el ancho del body al tamaño de la ventana
});

cerrar.addEventListener("click", () => {
  nav.classList.remove("navVisible");
  body.style.overflow = "auto"; // Restaura el scroll del body cuando el nav se cierra
  body.style.height = ""; // Restaura la altura del body
  body.style.width = ""; // Restaura el ancho del body
});

navList.forEach((boton) => {
  boton.addEventListener("click", () => {
    nav.classList.remove("navVisible");
    body.style.overflow = "auto"; // Restaura el scroll del body al hacer clic en un botón del nav
    body.style.height = ""; // Restaura la altura del body
    body.style.width = ""; // Restaura el ancho del body
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const inicioLink = document.getElementById('abrir');

  inicioLink.addEventListener("click", function (e) {
    e.preventDefault();
    const targetElement = document.getElementById('nav');

    if (targetElement) {
      const yOffset = -60; // Ajusta según sea necesario
      const y =
        targetElement.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y/* , behavior: "smooth"  */});
    }
  });
});
