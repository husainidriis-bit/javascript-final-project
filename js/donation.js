
// DONATIONS.JS


const donationForm =
  document.getElementById("donationForm");

const donationTableBody =
  document.getElementById("donationTableBody");

const searchDonation =
  document.getElementById("searchDonation");

let donations =
  JSON.parse(localStorage.getItem("donations")) || [];

document.addEventListener("DOMContentLoaded", () => {
  renderDonations();
});

// Add Donation
donationForm?.addEventListener(
  "submit",
  addDonation
);

function addDonation(e) {
  e.preventDefault();

  const donation = {
    id: Date.now(),
    donorName:
      document.getElementById("donorName").value,
    email:
      document.getElementById("donorEmail").value,
    amount: Number(
      document.getElementById(
        "donationAmount"
      ).value
    ),
    country:
      document.getElementById("countryInput").value,
    date:
      document.getElementById("donationDate").value
  };

  donations.push(donation);

  localStorage.setItem(
    "donations",
    JSON.stringify(donations)
  );

  addActivity(
    `${donation.donorName} donated $${donation.amount}`
  );

  donationForm.reset();

  renderDonations();
}

// Display Donations
function renderDonations(data = donations) {
  if (!donationTableBody) return;

  if (data.length === 0) {
    donationTableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;">
          No donations found
        </td>
      </tr>
    `;
    return;
  }

  donationTableBody.innerHTML = data
    .map(
      donation => `
      <tr>
        <td>${donation.donorName}</td>
        <td>${donation.email}</td>
        <td>$${donation.amount}</td>
        <td>${donation.country}</td>
        <td>${donation.date}</td>
        <td>
          <button
            class="btn btn-danger"
            onclick="deleteDonation(${donation.id})">
            Delete
          </button>
        </td>
      </tr>
    `
    )
    .join("");
}

// Delete Donation
function deleteDonation(id) {
  if (
    !confirm(
      "Are you sure you want to delete this donation?"
    )
  )
    return;

  donations = donations.filter(
    donation => donation.id !== id
  );

  localStorage.setItem(
    "donations",
    JSON.stringify(donations)
  );

  addActivity("Donation Deleted");

  renderDonations();
}

// Search Donation
searchDonation?.addEventListener(
  "input",
  e => {
    const term =
      e.target.value.toLowerCase();

    const filtered =
      donations.filter(donation =>
        donation.donorName
          .toLowerCase()
          .includes(term)
      );

    renderDonations(filtered);
  }
);