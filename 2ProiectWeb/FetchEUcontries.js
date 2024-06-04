export function FetchEuropeanCountries(){
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
        const countryInfo = document.createElement('li');
        const languages = Object.values(country.languages).join(', ');
        countryInfo.innerHTML = `
        <strong>${country.name.common} </strong> - Languages: ${languages}`;
        europeanCountryList.appendChild(countryInfo);
      });
    })
    
  }
  FetchEuropeanCountries();