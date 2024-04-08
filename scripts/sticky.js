function handleScroll() {
  const isSticky = window.scrollY > 250;
  applyStickyStyles(isSticky);
  handleStickyActions(isSticky);
}

function applyStickyStyles(isSticky) {
  const nav = document.querySelector(".nav");
  const logo = document.querySelector(".navLogo");
  const input = document.getElementById("buscarInput");
  const inputSearchSticky = document.getElementById("search-input");
  const stickyLinks = document.querySelectorAll(".stickyLinks");
  const iconNavBarMobileLogo = document.getElementById("navBarMobileLogo");
  const iconNavBarMobile = document.getElementById("navBarMobile");
  const botonAbrirModalNav = document.getElementById("botonAbrirModalNav");

  nav.classList.toggle("sticky", isSticky);
  logo.classList.toggle("logoSticky", isSticky);
  iconNavBarMobile.classList.toggle("mobileSticky", window.scrollY > 200);

  const backgroundColor = isSticky ? "#0e0700" : "#f6f1e9";
  const textColor = isSticky ? "#fff" : "#2b2b2b";
  const borderBottomColor = isSticky
    ? "rgba(255, 255, 255, 0.7)"
    : "rgba(0, 0, 0, 0.2)";
  const visibility = isSticky ? "visible" : "hidden";
  const position = isSticky ? "relative" : "absolute";

  input.style.backgroundColor = backgroundColor;
  inputSearchSticky.style.backgroundColor = backgroundColor;
  inputSearchSticky.style.color = textColor;
  inputSearchSticky.style.borderBottom = `2px solid ${borderBottomColor}`;
  iconNavBarMobileLogo.style.visibility = visibility;
  iconNavBarMobileLogo.style.position = position;

  stickyLinks.forEach((link) => {
    link.style.position = position;
    link.style.visibility = visibility;
  });

  // Cambiar color de fondo del botón según el estado sticky
  botonAbrirModalNav.style.backgroundColor = backgroundColor;
  botonAbrirModalNav.style.color = textColor;

  // Cambiar color del subrayado del texto dentro del elemento .underline-hover::before
  const underlineHovers = document.querySelectorAll(".underlined-hover");
  underlineHovers.forEach((underlineHover) => {
    underlineHover.style.setProperty(
      "--colorFont",
      isSticky ? "#fff" : "#000"
    );
  });
}

function handleStickyActions(isSticky) {
  const lupa = document.getElementById("lupa");
  const carritoLogoStickyContainer = document.getElementById(
    "tiendaStickyContainer"
  );
  const carritoLogoSticky = document.getElementById("tiendaImgSticky");

  lupa.src = `./media/icons/lupa${isSticky ? "Blanca" : "Negra"}.svg`;

  const carritoLogoSrc = isSticky
    ? "./media/icons/cartBlack.svg"
    : "./media/icons/cartWhite.svg";
  carritoLogoStickyContainer.addEventListener("mouseover", () => {
    carritoLogoSticky.src = carritoLogoSrc;
  });

  carritoLogoStickyContainer.addEventListener("mouseout", () => {
    carritoLogoSticky.src = "./media/icons/cartWhite.svg";
  });
}

window.addEventListener("scroll", handleScroll);
