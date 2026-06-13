
//  DASHBOARD.JS


document.addEventListener(
  "DOMContentLoaded",
  updateDashboard
);

function updateDashboard() {
  const volunteers =
    JSON.parse(localStorage.getItem("volunteers")) || [];

  const donations =
    JSON.parse(localStorage.getItem("donations")) || [];

  const activities =
    JSON.parse(localStorage.getItem("activities")) || [];

  const volunteerCount =
    document.getElementById("volunteerCount");

  const donationCount =
    document.getElementById("donationCount");

  const totalRaised =
    document.getElementById("totalRaised");

  const progressFill =
    document.getElementById("progressFill");

  const progressText =
    document.getElementById("progressText");

  const activityList =
    document.getElementById("activityList");

  if (!volunteerCount) return;

  // Counts
  volunteerCount.textContent =
    volunteers.length;

  donationCount.textContent =
    donations.length;

  // Total Raised
  const total = donations.reduce(
    (sum, donation) =>
      sum + Number(donation.amount),
    0
  );

  totalRaised.textContent =
    "$" + total.toLocaleString();

  // Progress Bar
  const goal = 10000;

  const percentage =
    total > 0
      ? Math.min((total / goal) * 100, 100)
      : 0;

  progressFill.style.width =
    percentage + "%";

  progressText.textContent =
    `${percentage.toFixed(1)}% of Goal Achieved`;

  // Recent Activities
  activityList.innerHTML = "";

  if (activities.length === 0) {
    activityList.innerHTML =
      "<li>No recent activity.</li>";
    return;
  }

  activities
    .slice()
    .reverse()
    .slice(0, 10)
    .forEach(activity => {
      const li =
        document.createElement("li");

      li.textContent =
        `${activity.message} - ${activity.date}`;

      activityList.appendChild(li);
    });
}