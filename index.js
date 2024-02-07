const $loginInput = document.getElementById("login_input");
const $passInput = document.getElementById("password_input");
const $loginBtn = document.getElementById("login_button");
const $loginError = document.getElementById("login_error");

async function loginHandler() {
  const login = $loginInput.value;
  const password = $passInput.value;
  console.log(login, password);

  const response = await fetch(
    "https://login-service-wsb-wj.netlify.app/.netlify/functions/login",
    {
      method: "POST",
      body: JSON.stringify({
        // login: login
        // password: password, te zapisy sa takie same
        login,
        password,
      }),
    }
  ).then((res) => res.json());
  const isUserLogged = response.isLogged;
  if (isUserLogged) {
    localStorage.setItem("isLogged", "yes");
    window.location.href = "mainScreen.html";
  } else {
    $loginError.classList.remove("hidden");
  }
}

$loginBtn.addEventListener("click", loginHandler);
$passInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    loginHandler();
  }
});
