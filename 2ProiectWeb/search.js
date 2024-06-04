
     
      /*
function fetchAndInsertMenu() {
  fetch('menu.html')
      .then(resp => {
          if (!resp.ok) {
              throw new Error('Network response was not ok');
          }
          return resp.text();
      })
      .then(data => {
          document.getElementById('menuContent').innerHTML = data;
          initializeSearchFunctionality();
      })
      .catch(error => {
          console.error('Error:', error);
      });
}
    function initializeSearchFunctionality() {
      const searchInput = document.getElementById("countrySearch");
      if (searchInput) {
        searchInput.addEventListener("keypress", function(event) {
          if (event.key === "Enter") {
            const query = searchInput.value.trim();
            if (query) {
              searchCountry(query);
            } else {
              clearContent();  // Call clearContent if search input is empty
            }
          }
        });
  
        searchInput.addEventListener("input", function() {
          if (!searchInput.value.trim()) {
            clearContent();  // Call clearContent if search input is empty
          }
        });
      }
    }
  
    function searchCountry(query) {
      fetch(`https://restcountries.com/v3.1/name/${query}`)
        .then(response => response.json())
        .then(data => {
          if (!data.status) {
            displayCountry(data[0]);
            document.getElementById("contentSearch").style.display = "block";
          } else {
            alert("Country not found");
          }
        })
        .catch(error => console.error("Error fetching data:", error));
    }
  
    function displayCountry(country) {
      const contentDiv = document.getElementById("contentSearch");
      contentDiv.innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" style="width: 100px;">
      `;
    }
  
    function clearContent() {
      const contentDiv = document.getElementById("contentSearch");
      contentDiv.innerHTML = "";
      contentDiv.style.display = "none";
    }
    document.addEventListener('DOMContentLoaded', () => {
      fetchAndInsertMenu();
  });
  
  */


  function fetchAndInsertMenu() {
    fetch('./menu.html')
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.text();
        })
        .then(data => {
            document.getElementById('menuContent').innerHTML = data;
            initializeSearchFunctionality();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function initializeSearchFunctionality() {
    const searchInput = document.getElementById("countrySearch");
    if (searchInput) {
        searchInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                const query = searchInput.value.trim();
                if (query) {
                    searchCountry(query);
                } else {
                    clearContent(); 
                }
            }
        });

        searchInput.addEventListener("input", function() {
            if (!searchInput.value.trim()) {
                clearContent();  
            }
        });
    }
}

function searchCountry(query) {
    fetch(`https://restcountries.com/v3.1/all`)
        .then(response => response.json())
        .then(data => {
            const country = data.find(country => country.name.common.toLowerCase() === query.toLowerCase());
            if (country) {
                displayCountry(country);
                document.getElementById("contentSearch").style.display = "block";
            } else {
                alert("Country doesn't exist");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("Country doesn't exist");  
        });
}

function displayCountry(country) {
    const contentDiv = document.getElementById("contentSearch");
    contentDiv.innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" style="width: 100px;">
    `;
}

function clearContent() {
    const contentDiv = document.getElementById("contentSearch");
    contentDiv.innerHTML = "";
    contentDiv.style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndInsertMenu();
});
