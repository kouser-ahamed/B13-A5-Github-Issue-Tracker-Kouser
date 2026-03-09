document.getElementById("submit").addEventListener("click", function () {
  // Get the username and password values
  const username = document.getElementById("username");
  const userValue = username.value.toLowerCase();
  // Get the password value
  const password = document.getElementById("password");
  const passwordValue = password.value.toLowerCase();

  // check if the username and password are correct
  if (userValue === "admin" && passwordValue === "admin123") {
    alert("Loging successFull");
    window.location.assign("../homepage/homepage.html");
  } else {
    alert("Loging Failed");
    return;
  }
});
