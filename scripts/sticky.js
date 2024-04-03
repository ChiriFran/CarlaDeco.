function handleScroll() {
  const isSticky = window.scrollY > 200;
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

  nav.classList.toggle("sticky", isSticky);
  logo.classList.toggle("logoSticky", isSticky);
  iconNavBarMobile.classList.toggle("mobileSticky", window.scrollY > 200);

  const backgroundColor = isSticky ? "#0e0700" : "#f6f1e9";
  const textColor = isSticky ? "#fff" : "#2b2b2b";
  const borderBottomColor = isSticky ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.2)";
  const visibility = isSticky ? "visible" : "hidden";
  const position = isSticky ? "relative" : "absolute";

  input.style.backgroundColor = backgroundColor;
  inputSearchSticky.style.backgroundColor = backgroundColor;
  inputSearchSticky.style.color = textColor;
  inputSearchSticky.style.borderBottom = `2px solid ${borderBottomColor}`;
  iconNavBarMobileLogo.style.visibility = visibility;
  iconNavBarMobileLogo.style.position = position;

  stickyLinks.forEach(link => {
    link.style.position = position;
    link.style.visibility = visibility;
  });
}

function handleStickyActions(isSticky) {
  const lupa = document.getElementById("lupa");
  const carritoLogoStickyContainer = document.getElementById("tiendaStickyContainer");
  const carritoLogoSticky = document.getElementById("tiendaImgSticky");

  lupa.src = `./media/icons/lupa${isSticky ? 'Blanca' : 'Negra'}.svg`;

  const carritoLogoSrc = isSticky ? "./media/icons/carritoStickyNegro.svg" : "./media/icons/carritoSticky.svg";
  carritoLogoStickyContainer.addEventListener("mouseover", () => {
    carritoLogoSticky.src = carritoLogoSrc;
  });

  carritoLogoStickyContainer.addEventListener("mouseout", () => {
    carritoLogoSticky.src = "./media/icons/carritoSticky.svg";
  });
}

window.addEventListener("scroll", handleScroll);


