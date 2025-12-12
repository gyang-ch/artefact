// --- DOM ELEMENTS ---
const body = document.body;
const contentContainer = document.getElementById("contentContainer");
const articleText = document.getElementById("articleText");
const settingsPanel = document.getElementById("settingsPanel");
const settingsToggle = document.getElementById("settingsToggle");
const closeSettings = document.getElementById("closeSettings");
const progressBar = document.getElementById("progressBar");
const fontSelect = document.getElementById("fontSelect");
const sizeLabel = document.getElementById("currentSizeLabel");

let currentSize = 18;

// --- INITIALIZATION ---
window.onload = () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  const savedFont =
    localStorage.getItem("font") || "'Times New Roman', Times, serif";
  const savedWidth = localStorage.getItem("width") || "max-w-4xl";
  const savedSize = parseInt(localStorage.getItem("size")) || 18;

  setTheme(savedTheme);
  setFont(savedFont);
  setWidth(savedWidth);
  currentSize = savedSize;
  applyFontSize();

  if (fontSelect) fontSelect.value = savedFont;
};

// --- SETTINGS PANEL TOGGLE ---
if (settingsToggle) {
  settingsToggle.addEventListener("click", () => {
    settingsPanel.classList.remove("translate-x-[120%]");
  });
}
if (closeSettings) {
  closeSettings.addEventListener("click", () => {
    settingsPanel.classList.add("translate-x-[120%]");
  });
}

// --- GLOBAL CLICK LISTENER (CLOSE PANELS) ---
document.addEventListener("click", (event) => {
  // Close Settings Panel logic
  if (!settingsPanel.classList.contains("translate-x-[120%]")) {
    const isClickInsidePanel = settingsPanel.contains(event.target);
    const isClickOnToggle = settingsToggle.contains(event.target);
    if (!isClickInsidePanel && !isClickOnToggle) {
      settingsPanel.classList.add("translate-x-[120%]");
    }
  }
});

// --- THEME FUNCTIONS ---
function setTheme(themeName) {
  if (themeName === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  body.setAttribute("data-theme", themeName);
  localStorage.setItem("theme", themeName);
}

function setFont(fontValue) {
  articleText.style.fontFamily = fontValue;
  const headings = articleText.querySelectorAll("h1, h2, h3, h4");
  headings.forEach((h) => (h.style.fontFamily = fontValue));
  localStorage.setItem("font", fontValue);
}

function setWidth(maxWidthClass) {
  contentContainer.classList.remove("max-w-2xl", "max-w-4xl", "max-w-6xl");
  contentContainer.classList.add(maxWidthClass);
  localStorage.setItem("width", maxWidthClass);
}

function adjustFontSize(delta) {
  currentSize += delta;
  if (currentSize < 14) currentSize = 14;
  if (currentSize > 24) currentSize = 24;
  applyFontSize();
}

function applyFontSize() {
  articleText.style.fontSize = `${currentSize}px`;
  sizeLabel.textContent = `${currentSize}px`;
  localStorage.setItem("size", currentSize);
}

// --- PROGRESS BAR ---
window.onscroll = function () {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  if (progressBar) progressBar.style.width = scrolled + "%";
};
