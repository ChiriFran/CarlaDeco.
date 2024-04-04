let modal = document.getElementById('modalContainer');

let botonAbrirModal = document.getElementById('botonAbrirModal');
let botonAbrirModalNav = document.getElementById('botonAbrirModalNav');

let botonCerrarModal = document.getElementById('botonCerrarModal');
let botonCerrarModal2 = document.getElementById('botonCerrarModal2');

botonAbrirModal.addEventListener('click', () => {
    modal.showModal();
})

botonAbrirModalNav.addEventListener('click', () => {
    modal.showModal();
})

botonCerrarModal.addEventListener('click', () => {
    modal.close();
})

botonCerrarModal2.addEventListener('click', () => {
    modal.close();
})

modal.addEventListener('click', e => {
    const dialogDimensions = modal.getBoundingClientRect()
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        modal.close()
    }
})
