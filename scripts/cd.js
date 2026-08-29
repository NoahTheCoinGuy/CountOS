// ===============================
// CountOS Countdown Engine
// ===============================

// Holiday target dates (MM-DD-YYYY)
const targets = {
  halloween: "10-31-2026",
  christmas: "12-25-2026",
  easter: "04-05-2026",
  newyear: "01-01-2027",
  thanksgiving: "11-26-2026"
};

// Convert "mm-dd-yyyy" → Date object
function parseDate(str) {
  const [mm, dd, yyyy] = str.split("-");
  return new Date(Number(yyyy), Number(mm) - 1, Number(dd), 0, 0, 0);
}

// Format countdown parts with leading zeros
function pad(n) {
  return String(n).padStart(2, "0");
}

// Convert milliseconds → MM-DD-HH-MM-SS format
function diffToParts(ms) {
  if (ms <= 0) return "00-00-00-00-00";

  const totalSeconds = Math.floor(ms / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const months = Math.floor(totalDays / 30);
  const days = totalDays % 30;
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  return `${pad(months)}-${pad(days)}-${pad(hours)}-${pad(minutes)}-${pad(seconds)}`;
}

// Update a single countdown card
function updateCard(id, targetDateStr) {
  const el = document.querySelector(`#cd-${id} .cd-value`);
  if (!el) return;

  const now = new Date();
  const target = parseDate(targetDateStr);
  const diff = target.getTime() - now.getTime();

  el.textContent = diffToParts(diff);
}

// Update custom countdown
function updateCustom() {
  const input = document.querySelector("#custom-date");
  const el = document.querySelector("#cd-custom .cd-value");

  if (!input || !el) return;

  const value = input.value.trim();
  if (!/^\d{2}-\d{2}-\d{4}$/.test(value)) {
    el.textContent = "00-00-00-00-00";
    return;
  }

  const now = new Date();
  const target = parseDate(value);
  const diff = target.getTime() - now.getTime();

  el.textContent = diffToParts(diff);
}

// Main loop: updates all countdowns every second
function startCountdowns() {
  setInterval(() => {
    updateCard("halloween", targets.halloween);
    updateCard("christmas", targets.christmas);
    updateCard("easter", targets.easter);
    updateCard("newyear", targets.newyear);
    updateCard("thanksgiving", targets.thanksgiving);
    updateCustom();
  }, 1000);
}

// Start engine when page loads
window.addEventListener("DOMContentLoaded", startCountdowns);
