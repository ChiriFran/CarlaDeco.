const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");

openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible");
    document.body.classList.add("overflow-hidden");
});

closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
    document.body.classList.remove("overflow-hidden");
});
