
/* =========================================
   TRAVEL VIEW
   Renders the trip's transport, stays,
   transfers and document checklist.
========================================= */

const travelContainer = document.getElementById("travelContent");

function travelEscape(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function travelStatus(status) {
  const labels = {
    planned: "Planned",
    confirmed: "Confirmed",
    "to-book": "To book",
    "to-arrange": "To arrange",
    "to-add": "To add",
    "to-check": "To check",
    "to-complete": "To complete"
  };

  return labels[status] || status || "Pending";
}

function travelStatusClass(status) {
  if (status === "confirmed") return "status-confirmed";
  if (status === "planned") return "status-planned";
  return "status-pending";
}

function renderTravelNotes(notes = []) {
  if (!notes.length) return "";

  return `
    <ul class="travel-notes">
      ${notes.map(note => `<li>${travelEscape(note)}</li>`).join("")}
    </ul>
  `;
}

function renderTravelTimeline() {
  const items = window.TRAVEL_DATA.overview.timeline || [];

  return `
    <section class="travel-section">
      <div class="travel-section-heading">
        <div>
          <span class="travel-eyebrow">THE BIG PICTURE</span>
          <h2>Your journey at a glance</h2>
        </div>
      </div>

      <div class="travel-timeline">
        ${items.map((item, index) => `
          <article class="travel-timeline-item">
            <div class="travel-timeline-marker">
              <span>${String(index + 1).padStart(2, "0")}</span>
            </div>

            <div class="travel-timeline-card">
              <div class="travel-card-topline">
                <span class="travel-date">${travelEscape(item.date)}</span>
                <span class="travel-status ${travelStatusClass(item.status)}">
                  ${travelEscape(travelStatus(item.status))}
                </span>
              </div>

              <h3>${travelEscape(item.title)}</h3>
              <p>${travelEscape(item.details)}</p>

              ${item.departure || item.arrival ? `
                <div class="travel-time-row">
                  ${item.departure ? `
                    <span><small>DEPARTURE</small>${travelEscape(item.departure)}</span>
                  ` : ""}
                  ${item.arrival ? `
                    <span><small>ARRIVAL</small>${travelEscape(item.arrival)}</span>
                  ` : ""}
                </div>
              ` : ""}

              ${item.note ? `
                <p class="travel-card-note">${travelEscape(item.note)}</p>
              ` : ""}
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}


function renderTravelFlights() {
  const flights = window.TRAVEL_DATA.flights || [];

  const airportCode = airport => {
    if (airport.includes("Bhubaneswar")) return "BBI";
    if (airport.includes("Bengaluru")) return "BLR";
    if (airport.includes("Suvarnabhumi")) return "BKK";
    if (airport.includes("Chiang Mai")) return "CNX";
    if (airport.includes("Don Mueang")) return "DMK";
    return "---";
  };

  return `
    <section class="travel-section">
      <div class="travel-section-heading">
        <div>
          <span class="travel-eyebrow">✈️ YOUR FLIGHTS</span>
          <h2>Up in the air</h2>
          <p>Every flight, every connection, all in one place.</p>
        </div>
      </div>

      <div class="flight-card-list">
        ${flights.map(flight => `
          <article class="flight-card">

            <div class="flight-card-header">
              <div class="flight-airline">
                <span class="flight-airline-icon">✈️</span>
                <div>
                  <strong>${travelEscape(flight.airline)}</strong>
                  <span>${travelEscape(flight.flightNumber)}</span>
                </div>
              </div>

              <span class="travel-status ${travelStatusClass(flight.status)}">
                ${travelEscape(travelStatus(flight.status))}
              </span>
            </div>

            <div class="flight-route-display">
              <div class="flight-endpoint">
                <strong>${airportCode(flight.route.from)}</strong>
                <span>${travelEscape(flight.departure)}</span>
                <small>${travelEscape(flight.route.from)}</small>
              </div>

              <div class="flight-route-middle">
                <span>NON-STOP</span>
                <div class="flight-route-line">
                  <span>✈</span>
                </div>
                <small>${flight.id === "blr-bkk" ? "4h 05m" :
                  flight.id === "bbi-bkk" ? "2h 40m" :
                  flight.id === "cnx-dmk" ? "1h 20m" : "2h 50m"}</small>
              </div>

              <div class="flight-endpoint flight-endpoint-arrival">
                <strong>${airportCode(flight.route.to)}</strong>
                <span>${travelEscape(flight.arrival)}</span>
                <small>${travelEscape(flight.route.to)}</small>
              </div>
            </div>

            <div class="flight-card-date">
              📅 ${travelEscape(flight.date)}
            </div>

            <div class="flight-card-details">
              <div>
                <small>PASSENGERS</small>
                <strong>👤 ${(flight.passengers || []).map(travelEscape).join(", ")}</strong>
              </div>
              <div>
                <small>BAGGAGE</small>
                <strong>🧳 ${travelEscape(flight.baggage)}</strong>
              </div>
            </div>

            ${renderTravelNotes(flight.notes)}

          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderTravelBuses() {
  const buses = window.TRAVEL_DATA.buses || [];

  return `
    <section class="travel-section">
      <div class="travel-section-heading">
        <div>
          <span class="travel-eyebrow">🚌 OVERLAND JOURNEYS</span>
          <h2>The road north</h2>
          <p>One overnight journey from Bangkok to Chiang Mai.</p>
        </div>
      </div>

      <div class="bus-card-list">
        ${buses.map(bus => `
          <article class="bus-card">

            <div class="bus-card-top">
              <div>
                <span class="bus-card-label">OVERNIGHT BUS</span>
                <h3>${travelEscape(bus.operator)}</h3>
              </div>
              <span class="bus-icon">🚌</span>
            </div>

            <div class="bus-route-display">
              <div class="bus-endpoint">
                <strong>BKK</strong>
                <span>${travelEscape(bus.departure.time)}</span>
                <small>${travelEscape(bus.departure.location)}</small>
              </div>

              <div class="bus-route-middle">
                <span>OVERNIGHT</span>
                <div class="bus-route-line">〰〰〰</div>
                <small>Approx. 10.5 hours</small>
              </div>

              <div class="bus-endpoint bus-endpoint-arrival">
                <strong>CNX</strong>
                <span>${travelEscape(bus.arrival.time)}</span>
                <small>${travelEscape(bus.arrival.location)}</small>
              </div>
            </div>

            <div class="bus-date">
              📅 ${travelEscape(bus.date)} → Saturday, December 5
            </div>

            <div class="bus-ticket-footer">
              <div>
                <small>PASSENGERS</small>
                <strong>👥 ${travelEscape(bus.passengers)} travellers</strong>
              </div>
              <div>
                <small>OPERATOR</small>
                <strong>${travelEscape(bus.operator)}</strong>
              </div>
            </div>

            ${renderTravelNotes(bus.notes)}

          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderTravelAccommodation() {
  const stays = window.TRAVEL_DATA.accommodation || [];

  return `
    <section class="travel-section">
      <div class="travel-section-heading">
        <div>
          <span class="travel-eyebrow">WHERE YOU'LL STAY</span>
          <h2>Accommodation</h2>
        </div>
      </div>

      <div class="travel-card-grid">
        ${stays.map(stay => `
          <article class="travel-detail-card">
            <div class="travel-card-topline">
              <span class="travel-date">${travelEscape(stay.city)}</span>
              <span class="travel-status ${travelStatusClass(stay.status)}">
                ${travelEscape(travelStatus(stay.status))}
              </span>
            </div>

            <h3>${travelEscape(stay.name)}</h3>

            <div class="travel-stay-dates">
              <div>
                <small>CHECK-IN</small>
                <strong>${travelEscape(stay.checkIn)}</strong>
              </div>
              <div>
                <small>CHECK-OUT</small>
                <strong>${travelEscape(stay.checkOut)}</strong>
              </div>
              <div>
                <small>DURATION</small>
                <strong>${travelEscape(stay.nights)} nights</strong>
              </div>
            </div>

            ${stay.address ? `
              <p class="travel-muted">${travelEscape(stay.address)}</p>
            ` : ""}

            ${stay.website ? `
              <a class="travel-text-link"
                 href="${travelEscape(stay.website)}"
                 target="_blank"
                 rel="noopener noreferrer">
                Visit hotel website ↗
              </a>
            ` : ""}

            ${renderTravelNotes(stay.notes)}
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderTravelTransfers() {
  const transfers = window.TRAVEL_DATA.transfers || [];

  return `
    <section class="travel-section">
      <div class="travel-section-heading">
        <div>
          <span class="travel-eyebrow">GETTING AROUND</span>
          <h2>Private transfers</h2>
        </div>
      </div>

      <div class="travel-card-grid">
        ${transfers.map(transfer => `
          <article class="travel-detail-card">
            <div class="travel-card-topline">
              <span class="travel-date">${travelEscape(transfer.date)}</span>
              <span class="travel-status ${travelStatusClass(transfer.status)}">
                ${travelEscape(travelStatus(transfer.status))}
              </span>
            </div>

            <h3>${travelEscape(transfer.title)}</h3>

            <div class="travel-transfer-route">
              <div><small>PICKUP</small>${travelEscape(transfer.pickup)}</div>
              <div><small>DESTINATION</small>${travelEscape(transfer.destination)}</div>
            </div>

            ${transfer.departure ? `
              <p class="travel-muted">Departure: ${travelEscape(transfer.departure)}</p>
            ` : ""}

            ${renderTravelNotes(transfer.notes)}
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderTravelDocuments() {
  const documentData = window.TRAVEL_DATA.documents;
  const categories = documentData.categories || [];

  return `
    <section class="travel-section">
      <div class="travel-section-heading">
        <div>
          <span class="travel-eyebrow">IMPORTANT FILES</span>
          <h2>Documents & vouchers</h2>
          <p>${travelEscape(documentData.introduction)}</p>
        </div>
      </div>

      <div class="travel-document-grid">
        ${categories.map(category => `
          <article class="travel-document-card">
            <h3>${travelEscape(category.title)}</h3>

            <div class="travel-document-list">
              ${category.items.map(item => `
                <div class="travel-document-item">
                  <div class="travel-document-info">
                    <span class="travel-document-icon">↗</span>
                    <div>
                      <strong>${travelEscape(item.title)}</strong>
                      <span class="travel-status ${travelStatusClass(item.status)}">
                        ${travelEscape(travelStatus(item.status))}
                      </span>
                    </div>
                  </div>

                  ${item.file ? `
                    <a class="travel-document-link"
                       href="${travelEscape(item.file)}"
                       target="_blank"
                       rel="noopener noreferrer">
                      Open file ↗
                    </a>
                  ` : `
                    <span class="travel-document-empty">No file added</span>
                  `}
                </div>
              `).join("")}
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderTravelEssentials() {
  return `
    <section class="travel-section travel-essentials">
      <div class="travel-section-heading">
        <div>
          <span class="travel-eyebrow">JUST IN CASE</span>
          <h2>A little help along the way</h2>
          <p>Two small things worth keeping close.</p>
        </div>
      </div>

      <div class="travel-essentials-grid">

        <!-- EMERGENCY NUMBERS -->
        <details class="travel-quick-panel">
          <summary>
            <span class="travel-quick-icon">☎</span>
            <span class="travel-quick-title">
              <strong>Emergency numbers</strong>
              <small>Important contacts in Thailand</small>
            </span>
            <span class="travel-quick-arrow">⌄</span>
          </summary>

          <div class="travel-quick-content">

            <a class="travel-emergency-row" href="tel:1155">
              <span>
                <strong>Tourist Police</strong>
                <small>Tourist assistance</small>
              </span>
              <strong class="travel-phone-number">1155 ↗</strong>
            </a>

            <a class="travel-emergency-row" href="tel:191">
              <span>
                <strong>Police</strong>
                <small>General emergency</small>
              </span>
              <strong class="travel-phone-number">191 ↗</strong>
            </a>

            <a class="travel-emergency-row" href="tel:1669">
              <span>
                <strong>Ambulance</strong>
                <small>Medical emergency</small>
              </span>
              <strong class="travel-phone-number">1669 ↗</strong>
            </a>

            <p class="travel-quick-note">
              Tap a number to call from your phone.
            </p>
          </div>
        </details>

        <!-- USEFUL THAI PHRASES -->
        <details class="travel-quick-panel">
          <summary>
            <span class="travel-quick-icon">文</span>
            <span class="travel-quick-title">
              <strong>Useful Thai phrases</strong>
              <small>A few words go a long way</small>
            </span>
            <span class="travel-quick-arrow">⌄</span>
          </summary>

          <div class="travel-quick-content">

            <div class="travel-phrase-group">
              <span class="travel-phrase-category">GREETINGS</span>

              <div class="travel-phrase-row">
                <span>
                  <strong>Hello</strong>
                  <small>สวัสดีครับ</small>
                </span>
                <span class="travel-pronunciation">Sawatdee khrap</span>
              </div>

              <div class="travel-phrase-row">
                <span>
                  <strong>Thank you</strong>
                  <small>ขอบคุณครับ</small>
                </span>
                <span class="travel-pronunciation">Khop khun khrap</span>
              </div>

              <div class="travel-phrase-row">
                <span>
                  <strong>Excuse me / Sorry</strong>
                  <small>ขอโทษครับ</small>
                </span>
                <span class="travel-pronunciation">Kho thot khrap</span>
              </div>
            </div>

            <div class="travel-phrase-group">
              <span class="travel-phrase-category">FOOD & DINING</span>

              <div class="travel-phrase-row">
                <span>
                  <strong>Not spicy</strong>
                  <small>ไม่เผ็ด</small>
                </span>
                <span class="travel-pronunciation">Mai phet</span>
              </div>

              <div class="travel-phrase-row">
                <span>
                  <strong>A little spicy</strong>
                  <small>เผ็ดนิดหน่อย</small>
                </span>
                <span class="travel-pronunciation">Phet nit noi</span>
              </div>

              <div class="travel-phrase-row">
                <span>
                  <strong>Delicious!</strong>
                  <small>อร่อยมาก</small>
                </span>
                <span class="travel-pronunciation">Aroi mak</span>
              </div>

              <div class="travel-phrase-row">
                <span>
                  <strong>Water, please</strong>
                  <small>ขอน้ำเปล่าครับ</small>
                </span>
                <span class="travel-pronunciation">Kho nam plao khrap</span>
              </div>
            </div>

            <div class="travel-phrase-group">
              <span class="travel-phrase-category">GETTING AROUND</span>

              <div class="travel-phrase-row">
                <span>
                  <strong>Where is ...?</strong>
                  <small>...อยู่ที่ไหน?</small>
                </span>
                <span class="travel-pronunciation">... yoo tee nai?</span>
              </div>

              <div class="travel-phrase-row">
                <span>
                  <strong>How much?</strong>
                  <small>เท่าไหร่?</small>
                </span>
                <span class="travel-pronunciation">Thao rai?</span>
              </div>
            </div>

            <p class="travel-quick-note">
              Khrap (ครับ) is a polite ending commonly used by male speakers.
            </p>
          </div>
        </details>

      </div>
    </section>
  `;
}


function renderTravelPage() {
  if (!travelContainer || !window.TRAVEL_DATA) return;

  const data = window.TRAVEL_DATA;

  travelContainer.innerHTML = `
    <div class="travel-page">

      <header class="travel-hero">
        <span class="travel-eyebrow">YOUR TRIP, ALL IN ONE PLACE</span>
        <h1>${travelEscape(data.overview.title)}</h1>
        <p>${travelEscape(data.overview.subtitle)}</p>
      </header>

      ${renderTravelTimeline()}
      ${renderTravelFlights()}
      ${renderTravelBuses()}
      ${renderTravelAccommodation()}
      ${renderTravelTransfers()}
      ${renderTravelDocuments()}
      ${renderTravelEssentials()}

      <footer class="travel-footer">
        A little preparation makes more room for the adventure.
      </footer>

    </div>
  `;
}

/* =========================================
   NAVIGATION
========================================= */

function showTravelView() {
  const dayContent = document.getElementById("dayContent");
  const travelTab = document.getElementById("travelTab");

  if (!dayContent || !travelContainer) return;

  dayContent.hidden = true;
  travelContainer.hidden = false;

  document.querySelectorAll(".day-tab").forEach(tab => {
    tab.classList.remove("active");
  });

  travelTab?.classList.add("active");

  renderTravelPage();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showDayView() {
  const dayContent = document.getElementById("dayContent");
  const travelTab = document.getElementById("travelTab");

  if (!dayContent || !travelContainer) return;

  dayContent.hidden = false;
  travelContainer.hidden = true;

  travelTab?.classList.remove("active");
}

function initTravelNavigation() {
  const travelTab = document.getElementById("travelTab");

  if (!travelTab) return;

  travelTab.addEventListener("click", showTravelView);

  document.querySelectorAll(".day-tab").forEach(tab => {
    tab.addEventListener("click", showDayView);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTravelNavigation);
} else {
  initTravelNavigation();
}

window.renderTravelPage = renderTravelPage;
