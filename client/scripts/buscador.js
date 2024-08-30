// Función para realizar la búsqueda y redirigir
function performSearch() {
  // Obtener el valor de la búsqueda
  var searchTerm = document.getElementById("search-input").value;

  // Redireccionar a la página de resultados con el término de búsqueda como parámetro
  window.location.href =
    "../tienda.html" + encodeURIComponent(searchTerm);

  // Evitar que el formulario se envíe
  return false;
}
