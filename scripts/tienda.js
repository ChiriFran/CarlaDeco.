let productos = [];
let indiceInicio = 0; // Índice de inicio para mostrar los productos
const productosPorPagina = 16;

fetch("./scripts/productos.json")
  .then((response) => response.json())
  .then((data) => {
    productos = data;
    cargarProductos();
  })
  .catch((error) => {
    console.error("Error al cargar los productos:", error);
  });

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosMostrar = productos) {
  contenedorProductos.innerHTML = "";

  const productosPagina = productosMostrar.slice(
    indiceInicio,
    indiceInicio + productosPorPagina
  );

  productosPagina.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <div class="producto">
            <img src="${producto.imagen}" alt="${producto.titulo}" class="producto-imagen">
            <div class="image-hover">
            <button class="producto-agregar" id="${producto.id}"></button>
            </div>
        </div>
        <h2 class="producto-titulo">${producto.titulo}</h2>
        <h3 class="producto-precio">$${producto.precio}</h3>
    `;
    contenedorProductos.append(div);
  });

  actualizarBotonesAgregar();
}

function avanzarProductos() {
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  if (indiceInicio + productosPorPagina < productos.length) {
    indiceInicio += productosPorPagina;
    cargarProductos();
  }
}

function retrocederProductos() {
  if (indiceInicio - productosPorPagina >= 0) {
    indiceInicio -= productosPorPagina;
    cargarProductos();
  }
}

// Crear contenedor para los botones de avanzar y retroceder
const contenedorControles = document.createElement("div");
contenedorControles.classList.add("contenedor-controles");
document.querySelector("main").appendChild(contenedorControles);

// Botones de avanzar y retroceder
const botonAvanzar = document.createElement("button");
botonAvanzar.innerHTML =
  "<img src='./media/icons/flechaDerRedonda.svg' alt='Imagen de Avance'>";
botonAvanzar.addEventListener("click", avanzarProductos);

const botonRetroceder = document.createElement("button");
botonRetroceder.innerHTML =
  "<img src='./media/icons/flechaIzqRedonda.svg' alt='Imagen de retroceso'>";
botonRetroceder.addEventListener("click", retrocederProductos);

// Agregar botones al contenedor de controles
contenedorControles.appendChild(botonRetroceder);

// Agregar números de página
for (let i = 0; i < Math.ceil(productos.length / productosPorPagina); i++) {
  const numeroPagina = document.createElement("button");
  numeroPagina.innerText = i + 1;
  numeroPagina.addEventListener("click", () => {
    indiceInicio = i * productosPorPagina;
    cargarProductos();
  });
  contenedorControles.appendChild(numeroPagina);
}

contenedorControles.appendChild(botonAvanzar);

botonesCategorias.forEach((boton) =>
  boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
  })
);

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      const productoCategoria = productos.find(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      tituloPrincipal.innerText = productoCategoria.categoria.nombre;
      const productosBoton = productos.filter(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      cargarProductos(productosBoton);
    } else {
      tituloPrincipal.innerText = "Todos los productos";
      cargarProductos(productos);
    }
  });
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumerito();
} else {
  productosEnCarrito = [];
}

function agregarAlCarrito(e) {
  Toastify({
    text: "Producto agregado",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #0e0700, #0e0700)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      color: "white",
      fontSize: ".75rem",
    },
    offset: {
      x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: "1.5rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    onClick: function () {}, // Callback after click
  }).showToast();

  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(
    (producto) => producto.id === idBoton
  );

  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === idBoton
    );
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }

  actualizarNumerito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numerito.innerText = nuevoNumerito;
}

/* header fixed tienda */
window.addEventListener("scroll", () => {
  const headerMobile = document.querySelector(".header-mobile");
  window.scrollY > 0
    ? headerMobile.classList.add("header-fixed")
    : headerMobile.classList.remove("header-fixed");
});

