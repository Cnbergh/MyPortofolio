const loginPage = document.querySelector(".landing-page");
const gridItems = document.querySelectorAll(".hero-zoomable-grid-item");
let zoomedOut = false;

function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
    tablinks[i].classList.remove("active");
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;

  // Add the 'active' class to the clicked button
  elmnt.classList.add("active");
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

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

document.addEventListener("mousemove", parallax);
function parallax(e) {
  document.querySelector(".c-landing-page").style.backgroundPosition = `${
    e.pageX * -0.006
  }px ${e.pageY * -0.03}px`;
}
