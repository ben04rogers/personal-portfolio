const logoName = document.getElementById("logo-name");
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const body = document.querySelector("body");
const arrow = document.getElementById("arrow-scroll");
const navbar = document.querySelector("nav");
window.addEventListener("scroll", resizeNav);

const typedTextOptions = ["developer.", "student."];
const typingDelay = 100;
const erasingDelay = 100;
const newTextDelay = 1500;
let textArrayIndex = 0;
let charIndex = 0;

particlesJS.load("particles-js", "../.../particles.json", function () {
  console.log("callback - particles.js config loaded");
});

function type() {
  if (charIndex < typedTextOptions[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent +=
      typedTextOptions[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = typedTextOptions[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= typedTextOptions.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // On DOM Load initiate the effect
  if (typedTextOptions.length) setTimeout(type, newTextDelay + 250);
});

// Mobile Menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  if (hamburger.classList.contains("open")) {
    mobileMenu.classList.add("show");
    // mobileMenu.style.display = 'block';
    body.classList.add("noscroll");
  } else {
    mobileMenu.classList.remove("show");
    // mobileMenu.style.display = 'none';
    body.classList.remove("noscroll");
  }
});

// Resize and change colour of nav on scroll
function resizeNav() {
  if (window.scrollY > navbar.offsetHeight + 150) {
    navbar.classList.add("active");
    logoName.classList.remove("text-blue");
    logoName.classList.add("text-white");
  } else {
    navbar.classList.remove("active");
    logoName.classList.remove("text-white");
    logoName.classList.add("text-blue");
  }
}

window.addEventListener("DOMContentLoaded", function () {
  // get the form elements defined in your form HTML above
  var form = document.getElementById("contact-form");

  // var button = document.getElementById("my-form-button");
  var status = document.getElementById("status");

  // Success and Error functions for after the form is submitted
  function success() {
    form.reset();
    status.classList.add("success");
    status.innerHTML = "Thanks!";
  }

  function error() {
    status.classList.add("error");
    status.innerHTML = "Oops! There was a problem.";
  }

  // handle the form submission event
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request
function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}
