
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

  function renderWardrobe(day) {
    const wardrobe = day.wardrobe;

    if (!wardrobe) return "";

    const palette = (wardrobe.palette || []).map(color => `
      <div class="wardrobe-swatch">
        <span class="swatch-colour" style="background-color: ${color.hex}"></span>
        <span class="swatch-name">${color.name}</span>
      </div>
    `).join("");

    function outfitCard(label, outfit) {
      if (!outfit) return "";

      const alternatives = (outfit.alternatives || []).map(item => `
        <li>${item}</li>
      `).join("");

      return `
        <article class="wardrobe-outfit">
          <span class="wardrobe-eyebrow">${label}</span>
          <p class="wardrobe-main-outfit">${outfit.outfit}</p>
          ${alternatives ? `
            <div class="wardrobe-alternatives">
              <h5>Other ideas</h5>
              <ul>${alternatives}</ul>
            </div>
          ` : ""}
        </article>
      `;
    }

    const practicalNotes = (wardrobe.practicalNotes || []).map(note => `
      <li>${note}</li>
    `).join("");

    return `
      <section class="wardrobe-section">
        <div class="wardrobe-header">
          <span class="section-kicker">WHAT TO WEAR</span>
          <h2>${wardrobe.theme}</h2>
          <p>${wardrobe.intro || ""}</p>
        </div>

        <div class="wardrobe-palette-panel">
          <div>
            <span class="wardrobe-eyebrow">THE COLOUR STORY</span>
            <h3>Colours for the day</h3>
          </div>
          <div class="wardrobe-palette">
            ${palette}
          </div>
        </div>

        <div class="wardrobe-outfit-grid">
          ${outfitCard("MEN'S INSPIRATION", wardrobe.men)}
          ${outfitCard("WOMEN'S INSPIRATION", wardrobe.women)}
        </div>

        <div class="wardrobe-practical-grid">
          <article class="wardrobe-practical-card">
            <span class="wardrobe-eyebrow">FOOTWEAR</span>
            <p>${wardrobe.footwear || ""}</p>
          </article>

          <article class="wardrobe-practical-card">
            <span class="wardrobe-eyebrow">LAYERING</span>
            <p>${wardrobe.layering || ""}</p>
          </article>
        </div>

        ${practicalNotes ? `
          <div class="wardrobe-notes">
            <h3>Worth keeping in mind</h3>
            <ul>${practicalNotes}</ul>
          </div>
        ` : ""}

        ${wardrobe.photoNotes ? `
          <div class="wardrobe-photo-note">
            <span class="wardrobe-eyebrow">IN FRONT OF THE LENS</span>
            <p>${wardrobe.photoNotes}</p>
          </div>
        ` : ""}
      </section>
    `;
  }

  function renderBehindTheLens(day) {
    const content = day.behindTheLens;

    if (!content) return "";

    const photography = (content.photography || []).map(item => `
      <article class="lens-shot">
        <div class="lens-shot-heading">
          <h4>${item.title}</h4>
          <span class="lens-priority ${item.priority === "must-capture" ? "is-priority" : ""}">
            ${item.priority === "must-capture" ? "Must capture" : "Optional"}
          </span>
        </div>
        <p class="lens-location">${item.location}</p>
        <p>${item.direction}</p>
      </article>
    `).join("");

    const reels = (content.reels || []).map((reel, index) => `
      <details class="lens-reel" ${index === 0 ? "open" : ""}>
        <summary>
          <div>
            <span class="lens-eyebrow">REEL CONCEPT ${String(index + 1).padStart(2, "0")}</span>
            <h4>${reel.title}</h4>
            <p>${reel.duration}</p>
          </div>
          <span class="lens-expand">+</span>
        </summary>

        <div class="lens-reel-content">
          <p>${reel.concept}</p>

          <h5>Shot sequence</h5>
          <ol class="lens-shot-list">
            ${(reel.shots || []).map(shot => `<li>${shot}</li>`).join("")}
          </ol>

          <h5>Editing direction</h5>
          <p>${reel.editing}</p>
        </div>
      </details>
    `).join("");

    const transitions = (content.transitions || []).map(item => `
      <article class="lens-transition">
        <h4>${item.title}</h4>
        <p>${item.direction}</p>
        <p><strong>In the edit:</strong> ${item.edit}</p>
      </article>
    `).join("");

    const filmMoments = (content.filmMoments || []).map(item => `
      <li>${item}</li>
    `).join("");

    const checklist = [
      ...(content.photography || []).map(item => ({
        title: item.title,
        location: item.location
      })),
      ...(content.filmMoments || []).map(item => ({
        title: item,
        location: "Travel film"
      }))
    ];

    const checklistHTML = checklist.map(item => `
      <label class="lens-check-item">
        <input type="checkbox">
        <span>
          <strong>${item.title}</strong>
          <small>${item.location}</small>
        </span>
      </label>
    `).join("");

    return `
      <section class="behind-lens-section">
        <div class="behind-lens-header">
          <span class="section-kicker">BEHIND THE LENS</span>
          <h2>${content.theme}</h2>
          <p>${content.intro}</p>
        </div>

        <div class="lens-content-grid">

          <div class="lens-panel">
            <div class="lens-panel-heading">
              <span class="lens-icon">01</span>
              <div>
                <h3>Photography</h3>
                <p>Frames worth bringing home</p>
              </div>
            </div>
            <div class="lens-shot-grid">
              ${photography}
            </div>
          </div>

          <div class="lens-panel">
            <div class="lens-panel-heading">
              <span class="lens-icon">02</span>
              <div>
                <h3>Reels & content</h3>
                <p>Stories to create from the day</p>
              </div>
            </div>
            <div class="lens-reel-list">
              ${reels}
            </div>
          </div>

          <div class="lens-panel">
            <div class="lens-panel-heading">
              <span class="lens-icon">03</span>
              <div>
                <h3>Transitions</h3>
                <p>Movement, reveals and match cuts</p>
              </div>
            </div>
            <div class="lens-transition-list">
              ${transitions}
            </div>
          </div>

          <div class="lens-panel">
            <div class="lens-panel-heading">
              <span class="lens-icon">04</span>
              <div>
                <h3>Travel film moments</h3>
                <p>Footage for the bigger story</p>
              </div>
            </div>
            <ul class="lens-film-list">
              ${filmMoments}
            </ul>
          </div>

        </div>

        <div class="lens-checklist-panel">
          <div class="lens-panel-heading">
            <span class="lens-icon">05</span>
            <div>
              <h3>Capture checklist</h3>
              <p>Keep track of the moments you've captured</p>
            </div>
          </div>
          <div class="lens-checklist">
            ${checklistHTML}
          </div>
        </div>

        <p class="lens-footer">
          Capture the moments. Don't chase the checklist.
        </p>
      </section>
    `;
  }

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
              
      ${renderWardrobe(day)}

      ${renderBehindTheLens(day)}
    `;
  }

  // --------------------------------------------------
  // EVENT LISTENERS
  // --------------------------------------------------

  function bindChecklist() {
  content.querySelectorAll(".check-item input, .lens-check-item input")
    .forEach(input => {
      input.addEventListener("change", () => {
        input.closest("label").classList.toggle(
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
