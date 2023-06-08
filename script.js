const loginPage = document.querySelector(".landing-page");
const gridItems = document.querySelectorAll(".hero-zoomable-grid-item");
let zoomedOut = false;

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
}

// Funksjon for å beregne Fibonacci-sekvensen
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

// Legg til skaleringsdata for hvert element i gridItems basert på Fibonacci-sekvensen
gridItems.forEach((item, index) => {
  const scale = fib(index + 2) / fib(index + 3);
  item.style.transform = `scale(${scale})`;
  item.dataset.fibScale = scale;
});

// Legg til en lytter for musehjulhendelsen for å håndtere zooming
document.body.addEventListener("wheel", (e) => {
  if (e.deltaY < 0 && zoomedOut) {
    // Zoom inn
    loginPage.style.transform = "scale(1)";
    loginPage.style.opacity = "1";
    gridItems.forEach((item) => {
      item.style.transform = `scale(${item.dataset.fibScale})`;
    });

    zoomedOut = false;
  } else if (e.deltaY > 0 && !zoomedOut) {
    // Zoom ut
    loginPage.style.transform = "scale(0.5)";
    loginPage.style.opacity = "0";
    gridItems.forEach((item) => {
      item.style.transform = "scale(1)";
    });

    zoomedOut = true;
  }
});
