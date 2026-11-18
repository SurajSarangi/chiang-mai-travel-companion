(() => {
  const welcome = document.getElementById("welcomeScreen");
  const journey = document.getElementById("journeyScreen");
  const content = document.getElementById("dayContent");
  const dialog = document.getElementById("overviewDialog");
  let currentDay = 1;

  const dayTitles = {
    2: ["Mountain village escape", "Mae Kampong"],
    3: ["Thailand's highest mountain", "Doi Inthanon"],
    4: ["Temples, architecture & art", "Chiang Rai"],
    5: ["Mountain views & departure", "Mon Jam"]
  };

  function showJourney(day = 1) {
    welcome.classList.add("hidden");
    journey.classList.remove("hidden");
    renderDay(day);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderDay(day) {
    currentDay = day;
    document.querySelectorAll(".day-tab").forEach(tab => {
      const active = Number(tab.dataset.day) === day;
      tab.classList.toggle("active", active);
      if (active) tab.setAttribute("aria-current", "page");
      else tab.removeAttribute("aria-current");
    });

    if (day === 0) {
      content.innerHTML = renderDayZero(window.DAY_0);
    } else if (day === 1) {
      content.innerHTML = renderDayOne(window.DAY_1);
    } else {
      const info = dayTitles[day];
      content.innerHTML = `
        <section class="placeholder-panel">
          <div class="big-number">0${day}</div>
          <p class="eyebrow">${["", "", "SUNDAY · DECEMBER 6", "MONDAY · DECEMBER 7", "TUESDAY · DECEMBER 8", "WEDNESDAY · DECEMBER 9"][day]}</p>
          <h2>${info[0]}</h2>
          <p>${info[1]} is part of the agreed itinerary. Its detailed day view is coming in the next build step, after the Day 0 and Day 1 experience is reviewed.</p>
        </section>`;
    }
    content.querySelectorAll(".check-item input").forEach(input => {
      input.addEventListener("change", () => input.closest(".check-item").classList.toggle("done", input.checked));
    });
  }

  function hero(day) {
    return `
      <section class="day-hero">
        <div class="day-hero-copy">
          <p class="eyebrow">DAY ${day.number} · ${day.date.toUpperCase()}</p>
          <h2>${day.title}</h2>
          <p class="day-description">${day.description}</p>
          <div class="day-meta">
            <div class="meta-item"><span>TRANSPORT</span><strong>${day.transport}</strong></div>
            <div class="meta-item"><span>PACE / DURATION</span><strong>${day.duration}</strong></div>
            <div class="meta-item"><span>BUDGET</span><strong>${day.budget}</strong></div>
          </div>
        </div>
        <div class="day-hero-image" role="img" aria-label="${day.subtitle}" style="--hero-image:url('${day.image}')"></div>
      </section>`;
  }

  function sectionHeading(title, kicker = "") {
    return `<div class="section-heading"><h3>${title}</h3>${kicker ? `<span>${kicker}</span>` : ""}</div>`;
  }

  function stopCard(stop, index) {
    return `
      <article class="stop-card">
        <div class="stop-top">
          <div>
            <h4>${stop.name}</h4>
            <p>${stop.description}</p>
          </div>
          <span class="stop-number">${String(index + 1).padStart(2, "0")}</span>
        </div>
        <div class="stop-tags">${stop.tags.map(tag => `<span class="tag ${stop.optional ? "optional" : ""}">${tag}</span>`).join("")}</div>
        <details class="stop-details">
          <summary>Practical notes</summary>
          <p>${stop.detail}</p>
        </details>
      </article>`;
  }

  function foodRows(items) {
    return `<div class="food-list">${items.map(item => `
      <div class="food-row">
        <div><strong>${item.name}</strong><span>${item.detail}</span></div>
        <span class="food-type">${item.type}</span>
      </div>`).join("")}</div>`;
  }

  function checklist(items) {
    return `<div class="check-list">${items.map(item => `
      <label class="check-item"><input type="checkbox"><span>${item}</span></label>`).join("")}</div>`;
  }

  function renderDayZero(day) {
    return `${hero(day)}
      <div class="content-grid">
        <div>
          <section class="content-section">
            ${sectionHeading("The journey north", "BANGKOK → CHIANG MAI")}
            <div class="timeline">${day.stops.map(stopCard).join("")}</div>
          </section>
          <section class="content-section">
            ${sectionHeading("Before boarding")}
            ${checklist(day.checklist)}
          </section>
        </div>
        <aside class="content-sidebar">
          <div class="side-card">
            <p class="eyebrow">DEPARTURE</p>
            <h3>9:00 PM</h3>
            <p>Friday, December 4<br>Khaosan Bus Stop, Bangkok</p>
          </div>
          <div class="side-card light-card">
            <p class="eyebrow">ARRIVAL · TENTATIVE</p>
            <h3>7:30 AM</h3>
            <p>Saturday, December 5<br>Chiang Mai Bus Terminal 3</p>
            <div class="notice">The bus operator's displayed arrival time is an estimate. Keep Day 1 flexible in case of delays.</div>
          </div>
        </aside>
      </div>`;
  }

  function renderDayOne(day) {
    const arrival = `
      <article class="stop-card arrival-card">
        <div class="stop-top"><div><h4>${day.arrival.title}</h4><p>${day.arrival.description}</p></div><span class="stop-number">00</span></div>
        <div class="stop-tags"><span class="tag">7:30 AM · TENTATIVE</span><span class="tag">BUS TERMINAL 3</span></div>
        <details class="stop-details"><summary>Arrival notes</summary><p>${day.arrival.detail}</p></details>
      </article>`;
    return `${hero(day)}
      <div class="content-grid">
        <div>
          <section class="content-section">
            ${sectionHeading("The day, as it unfolds", "FLEXIBLE ORDER · NOT TIMED")}
            <div class="timeline">${arrival}${day.stops.map(stopCard).join("")}</div>
            <div class="notice">Arrival-day pacing: the order is a planning sequence, not a fixed timetable. Jing Jai Market is especially dependent on the actual arrival time and energy after the overnight bus.</div>
          </section>
          <section class="content-section">
            ${sectionHeading("Eat, sip & snack", "DAY 01")}
            ${foodRows(day.food)}
          </section>
          <section class="content-section">
            ${sectionHeading("A few things to confirm")}
            ${checklist(day.reminders)}
          </section>
        </div>
        <aside class="content-sidebar">
          <div class="side-card">
            <p class="eyebrow">YOUR CHIANG MAI BASE</p>
            <h3>${day.hotel.name}</h3>
            <p>${day.hotel.note}</p>
            <a href="${window.TRIP.hotel.url}" target="_blank" rel="noreferrer">Hotel website ↗</a><br><br>
            <a href="${window.TRIP.hotel.maps}" target="_blank" rel="noreferrer">Open in Google Maps ↗</a>
          </div>
          <div class="side-card light-card">
            <p class="eyebrow">THE EVENING</p>
            <h3>Market to music.</h3>
            ${day.evening.map(item => `<p>↗ ${item}</p>`).join("")}
          </div>
          <div class="side-card light-card">
            <p class="eyebrow">KEEP IN MIND</p>
            ${day.notes.map(note => `<p>• ${note}</p>`).join("")}
          </div>
        </aside>
      </div>`;
  }

  document.getElementById("beginButton").addEventListener("click", () => showJourney(1));
  document.getElementById("backToCover").addEventListener("click", () => {
    journey.classList.add("hidden");
    welcome.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.getElementById("homeLink").addEventListener("click", event => {
    event.preventDefault();
    journey.classList.add("hidden");
    welcome.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.querySelectorAll(".day-tab").forEach(tab => {
    tab.addEventListener("click", () => showJourney(Number(tab.dataset.day)));
  });
  document.getElementById("overviewButton").addEventListener("click", () => dialog.showModal());
  document.getElementById("closeOverview").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
})();
