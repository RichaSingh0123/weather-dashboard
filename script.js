const apiKey = "c344461c271d318939ea476431e815f6";

async function getWeather() {
  const city = cityInput.value;
  const weatherBox = document.getElementById("weatherResult");
  const warning = document.getElementById("warning");

  if (!city) return;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const data = await res.json();
  if (data.cod !== 200) return;

  const condition = data.weather[0].main;
  const emoji = getEmoji(condition);

  resetEffects();
  changeBackground(condition);
  handleEffects(condition);
  handleWarning(condition);

  weatherBox.style.display = "block";
  weatherBox.innerHTML = `
    <p class="city">${data.name}, ${data.sys.country}</p>
    <div class="emoji">${emoji}</div>
    <p class="temp">${Math.round(data.main.temp)}°</p>
    <p class="desc">${data.weather[0].description}</p>

    <div class="details">
      <div class="detail-box">💧 Humidity<br><b>${data.main.humidity}%</b></div>
      <div class="detail-box">🌬 Wind<br><b>${data.wind.speed} m/s</b></div>
    </div>
  `;
}

function getEmoji(c) {
  if (c === "Clear") return "☀️";
  if (c === "Rain") return "🌧️";
  if (c === "Drizzle") return "🌦️";
  if (c === "Clouds") return "☁️";
  if (c === "Thunderstorm") return "⛈️";
  if (c === "Snow") return "❄️";
  return "🌫️";
}


function handleEffects(c) {
  if (c === "Rain" || c === "Drizzle") startRain();
  if (c === "Clear") {
    showConfetti();
    sunrays.style.display = "block";
  }
}


function handleWarning(c) {
  const w = document.getElementById("warning");
  if (c === "Thunderstorm" || c === "Snow") {
    w.style.display = "block";
    w.innerText = "⚠️ Severe weather alert. Stay safe!";
  } else {
    w.style.display = "none";
  }
}


function changeBackground(c) {
  if (c === "Clear")
    document.body.style.background = "radial-gradient(circle at top, #ffe259, #ffa751)";
  else if (c === "Rain")
    document.body.style.background = "radial-gradient(circle at top, #667db6, #0082c8)";
  else
    document.body.style.background = "radial-gradient(circle at top, #b3e5ff, #6fa8ff)";
}


function startRain() {
  rain.style.display = "block";
  rain.innerHTML = "";
  for (let i = 0; i < 140; i++) {
    const d = document.createElement("div");
    d.className = "drop";
    d.style.left = Math.random() * window.innerWidth + "px";
    d.style.animationDuration = 0.5 + Math.random() + "s";
    rain.appendChild(d);
  }
}


function resetEffects() {
  rain.style.display = "none";
  rain.innerHTML = "";
  confetti.innerHTML = "";
  sunrays.style.display = "none";
}


function showConfetti() {
  for (let i = 0; i < 80; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * window.innerWidth + "px";
    c.style.background = `hsl(${Math.random()*360},100%,60%)`;
    confetti.appendChild(c);
  }
  setTimeout(() => confetti.innerHTML = "", 3000);
}

