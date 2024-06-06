export function FetchEuropeanCountries() {
  fetch('https://restcountries.com/v3.1/all')
      .then(resp => {
          if (!resp.ok) {
              throw new Error('Network response was not ok');
          }
          return resp.json();
      })
      .then(data => {
          const europeanCountryList = document.getElementById('europeanCountryList');
          const europeanCountries = data.filter(country => country.region === 'Europe');
          europeanCountries.forEach(country => {
              const countryBox = document.createElement('div');
              countryBox.className = 'country-box';
              const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
              countryBox.innerHTML = `
                  <strong>${country.name.common}</strong><br>Languages: ${languages}
              `;
              europeanCountryList.appendChild(countryBox);
          });
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
      });
}

document.addEventListener('DOMContentLoaded', FetchEuropeanCountries);
