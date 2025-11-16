let countryContent = document.querySelector(".country-content");
let input = document.querySelector(".input-container input");
let filters = document.querySelector(".filters");
let themeChangeBtn = document.querySelector(".theme-change");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

themeChangeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

let allCountries = [];

fetch(
  "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
)
  .then((res) => res.json())
  .then((data) => {
    allCountries = data;
    randerCountries(data);
  })
  .catch((error) => {
    console.log(error);
  });

function randerCountries(data) {
  countryContent.innerHTML = "";
  data.forEach((country) => {
    let card = document.createElement("a");
    card.classList.add("card");
    card.href = `/country.html?name=${country.name.common}`;
    card.innerHTML = `
            <div class="country-card">
                <div class="country-img">
                    <img src="${country.flags.svg}" alt="${
      country.name.common
    } flag" />
                </div>
                <div class="country-details">
                    <h3 class="country-name">${country.name.common}</h3>
                    <div class="country-text">
                    <p><b>Population:&nbsp;</b>${new Intl.NumberFormat(
                      "en-PK"
                    ).format(country.population)}</p>
                    <p><b>Region:&nbsp;</b>${country.region}</p>
                    <p><b>Capital:&nbsp;</b>${country.capital.join(", ")}</p>
                    </div>
                </div>
            </div>
            `;

    countryContent.append(card);
  });
}

input.addEventListener("input", function (dets) {
  let filteredValues = allCountries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(dets.target.value.toLowerCase());
  });

  randerCountries(filteredValues);
});

filters.addEventListener("change", function (dets) {
  fetch(`https://restcountries.com/v3.1/region/${dets.target.value}`)
    .then((res) => res.json())
    .then((data) => {
      randerCountries(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
