const toggle = document.querySelector(".toggle-DropDown");
const nav = document.querySelector(".naav");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  nav.classList.toggle("active");
});

document.querySelectorAll(".nav-item").forEach((n) =>
  n.addEventListener("click", () => {
    toggle.classList.remove("active");
    nav.classList.remove("active");
  })
);
let slideIndex = [1, 1];
let slideId = ["mySlides1", "mySlides2"];
showSlides(1, 0);
showSlides(1, 1);

function plusSlides(n, no) {
  showSlides((slideIndex[no] += n), no);
}

function showSlides(n, no) {
  let i;
  let x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {
    slideIndex[no] = 1;
  }
  if (n < 1) {
    slideIndex[no] = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex[no] - 1].style.display = "block";
}

function login() {
  window.location.href = "../login.html";
}
function register() {
  window.location.href = "../register.html";
}
