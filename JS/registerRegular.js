const formSubmit = document.getElementById("registration-form");
formSubmit.addEventListener("submit", function (event) {
  const fileInput = document.getElementById("profile-picture");
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirm-password")
    .value.trim();
  const username = document.getElementById("username").value.trim();
  const contactnumber = document.getElementById("contactnumber").value.trim();
  const email = document.getElementById("email").value.trim();

  if (
    username.length !== 0 &&
    contactnumber.length !== 0 &&
    email.length !== 0 &&
    password.length !== 0 &&
    confirmPassword.length !== 0
  ) {
    if (password !== confirmPassword) {
      alert("Your passowrd and conform password must be same");
      event.preventDefault();
    }
    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      const extension = fileName.split(".").pop().toLowerCase();
      if (
        extension !== "jpg" &&
        extension !== "jpeg" &&
        extension !== "png" &&
        extension !== "gif"
      ) {
        alert("Please upload only image files (jpg, jpeg, png, gif).");
        event.preventDefault();
      }
    }
  } else {
    alert("Please enter the value. There are only space in some input");
  }
});
