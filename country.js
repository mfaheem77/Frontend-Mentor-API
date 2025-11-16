let countryFlagImg = document.querySelector(".country-img img");
let countryNameElem = document.querySelector(".country-name");
let nativeName = document.querySelector(".native-name");
let population = document.querySelector(".population");
let region = document.querySelector(".region");
let subRegion = document.querySelector(".sub-region");
let capital = document.querySelector(".capital");

let domain = document.querySelector(".domain");
let currency = document.querySelector(".currency");
let languages = document.querySelector(".languages");

let backBtn = document.querySelector(".back-btn");

let borderCountries = document.querySelector(".border-countries");

let themeChangeBtn = document.querySelector(".theme-change");

let countryName = new URLSearchParams(window.location.search).get("name");

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

fetch(
  `https://restcountries.com/v3.1/name/${countryName}
`
)
  .then((res) => res.json())
  .then(([data]) => {
    countryFlagImg.src = data.flags.svg;
    countryNameElem.textContent = data.name.common;

    nativeName.textContent = data.name.nativeName
      ? Object.values(data.name.nativeName)[0].common
      : data.name.common;

    population.textContent = new Intl.NumberFormat("en-PK").format(
      data.population
    );

    region.textContent = data.region;
    subRegion.textContent = data.subregion;

    capital.textContent = data.capital.join(", ");

    domain.textContent = data.tld.join(", ");

    currency.textContent = data.currencies
      ? Object.values(data.currencies)[0].name
      : data.name.common;

    languages.textContent = data.languages
      ? Object.values(data.languages).join(", ")
      : "N/A";

    if (data.borders) {
      data.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            let borderTag = document.createElement("a");
            borderTag.textContent = borderCountry.name.common;
            borderTag.href = `country.html?name=${border}`;
            borderCountries.append(borderTag);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } else {
      borderCountries.textContent = "N/A";
    }
  })
  .catch((error) => {
    console.log(error);
  });

backBtn.addEventListener("click", function () {
  history.back();
});
