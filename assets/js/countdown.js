
(function () {
  const targetDate = new Date("2026-12-04T09:45:00+05:30").getTime();

  const countdown = document.getElementById("coverCountdown");
  const timeDisplay = document.getElementById("coverCountdownTime");

  if (!countdown || !timeDisplay) return;

  let timer;

  function updateCountdown() {
    const remaining = targetDate - Date.now();

    if (remaining <= 0) {
      countdown.innerHTML = `
        <span class="cover-countdown-time">
          THE ADVENTURE HAS BEGUN
        </span>
      `;

      clearInterval(timer);
      return;
    }

    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    const pad = value => String(value).padStart(2, "0");

    timeDisplay.textContent =
      `${pad(days)} DAYS · ${pad(hours)} HRS · ` +
      `${pad(minutes)} MIN · ${pad(seconds)} SEC`;
  }

  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
})();
