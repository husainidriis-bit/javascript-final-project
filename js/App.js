
// APP.JS

// Dark Mode
const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-mode")
        ? "dark"
        : "light"
    );
  });
}

// Load saved theme
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});

// Activity Logger
function addActivity(message) {
  const activities =
    JSON.parse(localStorage.getItem("activities")) || [];

  activities.push({
    message,
    date: new Date().toLocaleString()
  });

  localStorage.setItem(
    "activities",
    JSON.stringify(activities)
  );
}