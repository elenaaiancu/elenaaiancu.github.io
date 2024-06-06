document.addEventListener("DOMContentLoaded", function() {
    const favoriteList = document.getElementById("favoritesList");
    const favoritesContainer = document.getElementById("favorites-container");
    const toggleFavoritesButton = document.getElementById("toggle-favorites");

    function addToFavorites(countryName) {
        console.log("Country added to favorites:", countryName);
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (!favorites.includes(countryName)) {
            favorites.push(countryName);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            displayFavorites();
        } else {
            alert(`${countryName} is already in your favorites list.`);
        }
    }

    function fetchAllCountries() {
        fetch('https://restcountries.com/v3.1/all')
        .then((resp) => {
            if (!resp.ok) {
                throw Error("NETWORK ISSUE");
            }
            return resp.json();
        })
        .then(data => {
            data.sort((a, b) => {
                return a.name.common.localeCompare(b.name.common);
            });

            const countryList = document.getElementById("country-list");
            
            data.forEach(country => {
                const countryName = country.name.common;
                const countryCapital = country.capital?.[0]; 
                const countryPopulation = country.population;
                const countryFlag = country.flags.svg;
                const countryArea = country.area;
                const listItem = document.createElement("div");
                listItem.innerHTML =
                `
                <div class="countryinfo">
                    <strong>${countryName}: </strong>
                    <p> - Capital: ${countryCapital} </p>
                    <p> - Population: ${countryPopulation}</p>
                    <p> - Area: ${countryArea} square kilometers</p>
                    <div class="button-container">
                        <button class="add-to-favorites">Add to Favorites</button>
                    </div>
                    <br>
                </div>
                
                <div class="flagcontainer">
                    <img src="${countryFlag}" alt="Flag" class="flagsimage">
                </div>
                `;
                
                const addToFavoritesButton = listItem.querySelector(".add-to-favorites");
                addToFavoritesButton.addEventListener("click", function() {
                    addToFavorites(countryName);
                });

                countryList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Failed to fetch countries:", error);
        });
    }

    function displayFavorites() {
        favoriteList.innerHTML = ""; 
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        
        console.log("Favorites:", favorites); 

        favorites.forEach(countryName => {
            const favoriteItem = document.createElement("div"); 
            favoriteItem.textContent = countryName;
            favoriteList.appendChild(favoriteItem);
        });
    }
    
    toggleFavoritesButton.addEventListener("click", function() {
        console.log("Toggle button clicked");
        if (favoritesContainer.classList.contains("hidden")) {
            displayFavorites(); 
            favoritesContainer.classList.remove("hidden");
            toggleFavoritesButton.textContent = "Hide Favorites";
        } else {
            favoritesContainer.classList.add("hidden");
            toggleFavoritesButton.textContent = "Show Favorites";
        }
    });

    fetchAllCountries();
    displayFavorites();
});
