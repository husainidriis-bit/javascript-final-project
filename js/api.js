
// API.JS
// REST Countries API


const countryInput =
  document.getElementById("countryInput");

countryInput?.addEventListener(
  "change",
  () => {
    getCountryInfo(countryInput.value);
  }
);

async function getCountryInfo(country) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );

    if (!response.ok) {
      throw new Error("Country not found");
    }

    const data = await response.json();

    const countryData = data[0];

    document.getElementById(
      "countryFlag"
    ).src =
      countryData.flags?.png || "";

    document.getElementById(
      "countryCapital"
    ).textContent =
      countryData.capital?.[0] || "N/A";

    document.getElementById(
      "countryPopulation"
    ).textContent =
      countryData.population.toLocaleString();

    const currency =
      Object.values(
        countryData.currencies || {}
      )[0];

    document.getElementById(
      "countryCurrency"
    ).textContent =
      currency?.name || "N/A";
  } catch (error) {
    console.error(error);

    document.getElementById(
      "countryCapital"
    ).textContent = "Not Found";

    document.getElementById(
      "countryPopulation"
    ).textContent = "Not Found";

    document.getElementById(
      "countryCurrency"
    ).textContent = "Not Found";
  }
}