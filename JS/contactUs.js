document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    // Add your form submission logic here
    alert("Form submitted!You will be notified within 72hours");
  });
function login() {
  window.location.href = "../login.html";
}
function register() {
  window.location.href = "../selectRegister.html";
}
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
