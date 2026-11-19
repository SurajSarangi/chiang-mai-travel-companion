
(() => {
  const welcome = document.getElementById("welcomeScreen");
  const journey = document.getElementById("journeyScreen");
  const content = document.getElementById("dayContent");
  const dialog = document.getElementById("overviewDialog");

  let currentDay = 1;

  // --------------------------------------------------
  // NAVIGATION
  // --------------------------------------------------

  function showJourney(day = 1) {
    welcome.classList.add("hidden");
    journey.classList.remove("hidden");

    renderDay(day);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function returnToCover() {
    journey.classList.add("hidden");
    welcome.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function renderDay(day) {
    currentDay = day;

    document.querySelectorAll(".day-tab").forEach(tab => {
      const active = Number(tab.dataset.day) === day;

      tab.classList.toggle("active", active);

      if (active) {
        tab.setAttribute("aria-current", "page");
      } else {
        tab.removeAttribute("aria-current");
      }
    });

    const dayData = window[`DAY_${day}`];

    if (dayData) {
      content.innerHTML = renderDayPage(dayData);
    } else {
      content.innerHTML = `
        <div class="placeholder-panel">
          <div class="big-number">0${day}</div>
          <h2>Coming together.</h2>
          <p>This day is still being prepared.</p>
        </div>
      `;
    }

    bindChecklist();
  }

  // --------------------------------------------------
  // SHARED COMPONENTS
  // --------------------------------------------------

  function hero(day) {
    return `
      <section class="day-hero">
        <div class="day-hero-copy">
          <p class="eyebrow">
            DAY ${day.number} · ${day.date.toUpperCase()}
          </p>

          <h2>${day.title}</h2>

          <p class="day-description">
            ${day.description}
          </p>

          <div class="day-meta">
            <div class="meta-item">
              <span>TRANSPORT</span>
              <strong>${day.transport || "—"}</strong>
            </div>

            <div class="meta-item">
              <span>PACE / DURATION</span>
              <strong>${day.duration || "—"}</strong>
            </div>

            <div class="meta-item">
              <span>BUDGET</span>
              <strong>${day.budget || "To be estimated"}</strong>
            </div>
          </div>
        </div>

        <div
          class="day-hero-image"
          role="img"
          aria-label="${day.subtitle || day.title}"
          style="--hero-image:url('${day.image || ""}')"
        ></div>
      </section>
    `;
  }

  function sectionHeading(title, kicker = "") {
    return `
      <div class="section-heading">
        <h3>${title}</h3>
        ${kicker ? `<span>${kicker}</span>` : ""}
      </div>
    `;
  }

  function stopCard(stop, index) {
    const tags = stop.tags || [];

    return `
      <article class="stop-card">
        <div class="stop-top">
          <div>
            <h4>${stop.name}</h4>
            <p>${stop.description || ""}</p>
          </div>

          <span class="stop-number">
            ${String(index + 1).padStart(2, "0")}
          </span>
        </div>

        ${
          tags.length
            ? `
              <div class="stop-tags">
                ${tags.map(tag => `
                  <span class="tag ${stop.optional ? "optional" : ""}">
                    ${tag}
                  </span>
                `).join("")}
              </div>
            `
            : ""
        }

        ${
          stop.detail
            ? `
              <details class="stop-details">
                <summary>Practical notes</summary>
                <p>${stop.detail}</p>
              </details>
            `
            : ""
        }
      </article>
    `;
  }

  function arrivalCard(arrival) {
    return `
      <article class="stop-card arrival-card">
        <div class="stop-top">
          <div>
            <h4>${arrival.title}</h4>
            <p>${arrival.description}</p>
          </div>

          <span class="stop-number">00</span>
        </div>

        ${
          arrival.tags?.length
            ? `
              <div class="stop-tags">
                ${arrival.tags.map(tag => `
                  <span class="tag">${tag}</span>
                `).join("")}
              </div>
            `
            : ""
        }

        ${
          arrival.detail
            ? `
              <details class="stop-details">
                <summary>Arrival notes</summary>
                <p>${arrival.detail}</p>
              </details>
            `
            : ""
        }
      </article>
    `;
  }

  function foodRows(items) {
    if (!items?.length) return "";

    return `
      <div class="food-list">
        ${items.map(item => `
          <div class="food-row">
            <div>
              <strong>${item.name}</strong>
              <span>${item.detail || ""}</span>
            </div>

            ${item.type ? `<span class="food-type">${item.type}</span>` : ""}
          </div>
        `).join("")}
      </div>
    `;
  }

  function checklist(items) {
    if (!items?.length) return "";

    return `
      <div class="check-list">
        ${items.map(item => `
          <label class="check-item">
            <input type="checkbox">
            <span>${item}</span>
          </label>
        `).join("")}
      </div>
    `;
  }

  // --------------------------------------------------
  // SIDEBAR COMPONENTS
  // --------------------------------------------------

  function customSidebarCards(cards) {
    if (!cards?.length) return "";

    return cards.map(card => `
      <div class="side-card ${card.light ? "light-card" : ""}">
        ${card.eyebrow ? `<p class="eyebrow">${card.eyebrow}</p>` : ""}

        ${card.title ? `<h3>${card.title}</h3>` : ""}

        ${(card.text || []).map(text => `<p>${text}</p>`).join("")}

        ${
          card.notice
            ? `<div class="notice">${card.notice}</div>`
            : ""
        }
      </div>
    `).join("");
  }

  function hotelCard(hotel) {
    if (!hotel) return "";

    const hotelLinks = window.TRIP?.hotel || {};

    return `
      <div class="side-card">
        <p class="eyebrow">YOUR CHIANG MAI BASE</p>

        <h3>${hotel.name}</h3>
        <p>${hotel.note || ""}</p>

        ${
          hotelLinks.url
            ? `
              <a href="${hotelLinks.url}" target="_blank" rel="noreferrer">
                Hotel website ↗
              </a><br><br>
            `
            : ""
        }

        ${
          hotelLinks.maps
            ? `
              <a href="${hotelLinks.maps}" target="_blank" rel="noreferrer">
                Open in Google Maps ↗
              </a>
            `
            : ""
        }
      </div>
    `;
  }

  function listSidebarCard(eyebrow, title, items, prefix = "") {
    if (!items?.length) return "";

    return `
      <div class="side-card light-card">
        <p class="eyebrow">${eyebrow}</p>

        ${title ? `<h3>${title}</h3>` : ""}

        ${items.map(item => `<p>${prefix}${item}</p>`).join("")}
      </div>
    `;
  }

  function renderSidebar(day) {
    return `
      <aside class="content-sidebar">

        ${customSidebarCards(day.sidebarCards)}

        ${hotelCard(day.hotel)}

        ${listSidebarCard(
          "THE EVENING",
          day.eveningTitle || "After the day's adventures.",
          day.evening,
          "↗ "
        )}

        ${listSidebarCard(
          "THE HIGHLIGHTS",
          "",
          day.highlights,
          "• "
        )}

        ${listSidebarCard(
          "KEEP IN MIND",
          "",
          day.notes,
          "• "
        )}

      </aside>
    `;
  }

  // --------------------------------------------------
  // ONE RENDERER FOR ALL DAYS
  // --------------------------------------------------

  function renderDayPage(day) {
    const stops = day.stops || [];
    const reminders = day.reminders || day.checklist || [];

    const timeline = [
      ...(day.arrival ? [arrivalCard(day.arrival)] : []),
      ...stops.map((stop, index) => stopCard(stop, index))
    ].join("");

    const hasTimeline = timeline.length > 0;
    const hasFood = day.food?.length > 0;
    const hasReminders = reminders.length > 0;

    return `
      ${hero(day)}

      <div class="content-grid">
        <div>

          ${
            hasTimeline
              ? `
                <section class="content-section">
                  ${sectionHeading(
                    day.timelineTitle || "The day, as it unfolds",
                    day.timelineKicker || "YOUR DAY"
                  )}

                  <div class="timeline">
                    ${timeline}
                  </div>

                  ${
                    day.timelineNotice
                      ? `<div class="notice">${day.timelineNotice}</div>`
                      : ""
                  }
                </section>
              `
              : ""
          }

          ${
            hasFood
              ? `
                <section class="content-section">
                  ${sectionHeading(
                    "Eat, sip & snack",
                    "FOOD & CAFES"
                  )}

                  ${foodRows(day.food)}
                </section>
              `
              : ""
          }

          ${
            hasReminders
              ? `
                <section class="content-section">
                  ${sectionHeading(
                    day.remindersTitle || "Before you go"
                  )}

                  ${checklist(reminders)}
                </section>
              `
              : ""
          }

        </div>

        ${renderSidebar(day)}
      </div>
    `;
  }

  // --------------------------------------------------
  // EVENT LISTENERS
  // --------------------------------------------------

  function bindChecklist() {
    content.querySelectorAll(".check-item input").forEach(input => {
      input.addEventListener("change", () => {
        input.closest(".check-item").classList.toggle(
          "done",
          input.checked
        );
      });
    });
  }

  document
    .getElementById("beginButton")
    .addEventListener("click", () => showJourney(1));

  document
    .getElementById("backToCover")
    .addEventListener("click", returnToCover);

  document
    .getElementById("homeLink")
    .addEventListener("click", event => {
      event.preventDefault();
      returnToCover();
    });

  document.querySelectorAll(".day-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      showJourney(Number(tab.dataset.day));
    });
  });

  document
    .getElementById("overviewButton")
    .addEventListener("click", () => dialog.showModal());

  document
    .getElementById("closeOverview")
    .addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", event => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

})();
