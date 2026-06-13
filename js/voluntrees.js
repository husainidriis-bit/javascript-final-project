
// VOLUNTEERS.JS


const volunteerForm =
  document.getElementById("volunteerForm");

const volunteerTableBody =
  document.getElementById("volunteerTableBody");

const searchVolunteer =
  document.getElementById("searchVolunteer");

let volunteers =
  JSON.parse(localStorage.getItem("volunteers")) || [];

document.addEventListener("DOMContentLoaded", () => {
  renderVolunteers();
});

// Add Volunteer
volunteerForm?.addEventListener(
  "submit",
  addVolunteer
);

function addVolunteer(e) {
  e.preventDefault();

  const volunteer = {
    id: Date.now(),
    name:
      document.getElementById("volunteerName").value,
    email:
      document.getElementById("volunteerEmail").value,
    phone:
      document.getElementById("volunteerPhone").value,
    skills:
      document.getElementById("volunteerSkills").value,
    availability:
      document.getElementById(
        "volunteerAvailability"
      ).value,
    status:
      document.getElementById(
        "volunteerStatus"
      ).value
  };

  volunteers.push(volunteer);

  localStorage.setItem(
    "volunteers",
    JSON.stringify(volunteers)
  );

  addActivity(
    `Volunteer Added: ${volunteer.name}`
  );

  volunteerForm.reset();

  renderVolunteers();
}

// Display Volunteers
function renderVolunteers(data = volunteers) {
  if (!volunteerTableBody) return;

  if (data.length === 0) {
    volunteerTableBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center;">
          No volunteers available
        </td>
      </tr>
    `;
    return;
  }

  volunteerTableBody.innerHTML = data
    .map(
      volunteer => `
      <tr>
        <td>${volunteer.name}</td>
        <td>${volunteer.email}</td>
        <td>${volunteer.phone}</td>
        <td>${volunteer.skills}</td>
        <td>${volunteer.availability}</td>
        <td>${volunteer.status}</td>
        <td>
          <button
            class="btn btn-danger"
            onclick="deleteVolunteer(${volunteer.id})">
            Delete
          </button>
        </td>
      </tr>
    `
    )
    .join("");
}

// Delete Volunteer
function deleteVolunteer(id) {
  if (
    !confirm(
      "Are you sure you want to delete this volunteer?"
    )
  )
    return;

  volunteers = volunteers.filter(
    volunteer => volunteer.id !== id
  );

  localStorage.setItem(
    "volunteers",
    JSON.stringify(volunteers)
  );

  addActivity("Volunteer Deleted");

  renderVolunteers();
}

// Search Volunteer
searchVolunteer?.addEventListener(
  "input",
  e => {
    const term =
      e.target.value.toLowerCase();

    const filtered =
      volunteers.filter(volunteer =>
        volunteer.name
          .toLowerCase()
          .includes(term)
      );

    renderVolunteers(filtered);
  }
);