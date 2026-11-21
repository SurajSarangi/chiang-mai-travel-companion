
(() => {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  const label = document.getElementById("themeLabel");
  const themeColor = document.getElementById("themeColor");

  if (!toggle) return;

  const modes = ["system", "light", "dark"];

  let savedMode = "system";

  try {
    savedMode = localStorage.getItem("northernEscapeTheme") || "system";
  } catch (error) {
    // Continue with system preference if storage is unavailable.
  }

  if (!modes.includes(savedMode)) {
    savedMode = "system";
  }

  let currentMode = savedMode;

  function applyTheme() {
    const systemPrefersDark =
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const effectiveTheme =
      currentMode === "system"
        ? (systemPrefersDark ? "dark" : "light")
        : currentMode;

    root.dataset.theme = effectiveTheme;

    icon.textContent =
      currentMode === "system" ? "◐" :
      currentMode === "light" ? "☀" : "☾";

    label.textContent = currentMode.toUpperCase();

    toggle.title = `Theme: ${currentMode}. Click to change.`;
    toggle.setAttribute(
      "aria-label",
      `Current theme: ${currentMode}. Click to change theme.`
    );

    if (themeColor) {
      themeColor.setAttribute(
        "content",
        effectiveTheme === "dark" ? "#1c2420" : "#f4f1e8"
      );
    }

    const favicon = document.getElementById("favicon");

    if (favicon) {
      const faviconPath = effectiveTheme === "dark"
        ? "/assets/favicon-dark.svg"
        : "/assets/favicon-light.svg";

      favicon.setAttribute("href", `${faviconPath}?v=2`);
    }
  }

  toggle.addEventListener("click", () => {
    const currentIndex = modes.indexOf(currentMode);
    currentMode = modes[(currentIndex + 1) % modes.length];

    try {
      localStorage.setItem("northernEscapeTheme", currentMode);
    } catch (error) {
      // Theme still works for the current session.
    }

    applyTheme();
  });

  window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (currentMode === "system") {
        applyTheme();
      }
    });

  applyTheme();
})();
