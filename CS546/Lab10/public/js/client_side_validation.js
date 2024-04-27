// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.getElementById("registration-form");
  const loginForm = document.getElementById("login-form");

  if (registrationForm) {
    registrationForm.addEventListener("submit", validateRegistrationForm);
  }

  if (loginForm) {
    loginForm.addEventListener("submit", validateLoginForm);
  }
});

async function validateRegistrationForm(event) {
  event.preventDefault();
  let errors = [];

  const firstName = document.getElementById("firstNameInput").value;
  const lastName = document.getElementById("lastNameInput").value;
  const emailAddress = document.getElementById("emailAddressInput").value;
  const password = document.getElementById("passwordInput").value;
  const confirmPassword = document.getElementById("confirmPasswordInput").value;
  const role = document.getElementById("roleInput").value;

  if (!firstName || firstName.trim() === "") {
    errors.push("First Name must be supplied");
  }
  if (!lastName || lastName.trim() === "") {
    errors.push("Last Name must be supplied");
  }

  if (!emailAddress || emailAddress.trim() === "") {
    errors.push("Email must be supplied");
  }

  if (!password || password.trim() === "") {
    errors.push("Password must be supplied");
  }

  if (!confirmPassword || confirmPassword.trim() === "") {
    errors.push("Confirm Password must be supplied");
  }

  if (!role) {
    errors.push("Error must be supplied");
  }

  if (
    firstName &&
    firstName.trim() !== "" &&
    !/^[A-Za-z]{2,25}$/.test(firstName)
  ) {
    errors.push(
      "First name must be between 2 and 25 characters and cannot contain numbers or spaces."
    );
  }

  if (
    lastName &&
    lastName.trim() !== "" &&
    !/^[A-Za-z]{2,25}$/.test(lastName)
  ) {
    errors.push(
      "Last name must be between 2 and 25 characters and cannot contain numbers or spaces."
    );
  }

  if (emailAddress.trim() !== "" && !/^\S+@\S+\.\S+$/.test(emailAddress)) {
    errors.push("Email address is invalid.");
  }

  if (
    password &&
    password.trim() !== "" &&
    !/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}/.test(password)
  ) {
    errors.push("Password must meet the specified criteria.");
  }

  if (
    password &&
    password.trim() !== "" &&
    confirmPassword &&
    confirmPassword.trim() !== "" &&
    password !== confirmPassword
  ) {
    errors.push("Passwords do not match.");
  }

  if (!["admin", "user"].includes(role.toLowerCase())) {
    errors.push('Role must be either "admin" or "user".');
  }

  if (errors.length > 0) {
    document.getElementById("error-message").innerHTML = errors.join(", ");
  } else {
    document.getElementById("error-message").innerHTML = "";
    event.target.submit();
  }
}

function validateLoginForm(event) {
  event.preventDefault(); // Prevent form submission to validate first
  let errors = [];

  const emailAddress = document.getElementById("emailAddressInput").value;
  const password = document.getElementById("passwordInput").value;

  if (!emailAddress || emailAddress.trim() === " ") {
    errors.push("Email must be supplied");
  }

  if (!password || password.trim() === "") {
    errors.push("Password must be supplied");
  }

  if (emailAddress.trim() !== "" && !/^\S+@\S+\.\S+$/.test(emailAddress)) {
    errors.push("Email address is invalid.");
  }

  console.log(errors);

  if (errors.length > 0) {
    document.getElementById("error-message").innerHTML = errors.join(", ");
  } else {
    document.getElementById("error-message").innerHTML = "";
    event.target.submit(); // No errors, proceed with form submission
  }
}
