if (localStorage.getItem("isLogged") !== "yes") {
  window.location.href = "index.html";
}

const $logoutBtn = document.getElementById("logoutBtn");
const $checkCountryBtn = document.getElementById("checkCountryBtn");
const $countryInput = document.getElementById("country_input");
const $capital = document.getElementById("capital");
const $changeScreenBtn = document.getElementById("changeScreenBtn");
const $noteScreen = document.getElementById("notes_screen");
const $generalScreen = document.getElementById("general_screen");

$changeScreenBtn.addEventListener("click", () => {
  $noteScreen.classList.toggle("hidden");
  $generalScreen.classList.toggle("hidden");
});

$checkCountryBtn.addEventListener("click", async () => {
  const country = $countryInput.value;
  const response = await fetch(
    "https://restcountries.com/v3.1/name/" + country
  ).then((res) => res.json());
  $capital.innerText = response[0].capital[0];
  const latlng = response[0].latlng;
  map.panTo(latlng);
});

function logout() {
  window.location.href = "index.html";
  //   zmiana do innej stronki, do poprzedniej strony logowania, mozna pominac window
  localStorage.setItem("isLogged", "");
  //   kiedy cofniemy to usuwamy z papmieci dane i nie bedziemy zalogowani
}
$logoutBtn.addEventListener("click", logout);

var map = L.map("map").setView([0, 0], 5);
L.tileLayer(
  "https://api.maptiler.com/maps/toner-v2/{z}/{x}/{y}.png?key=Nh5qW41jxRt4eHKv7BLh",
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(map);
