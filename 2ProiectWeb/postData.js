function FetchForm() {
    document.getElementById("travelForm").addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission
      const birthCountry = document.getElementById("birthCountry").value;
      const currentCountry = document.getElementById("currentCountry").value;
      const desiredLiveCountry = document.getElementById("desiredCountry").value;
      const visitedCountries = document.getElementById("visitedCountries").value;
      const desiredCountry = document.getElementById("desiredCountry").value;
  
  
      const requestBody = JSON.stringify({
        birthCountry: birthCountry,
        currentCountry: currentCountry,
        desiredLiveCountry: desiredCountry,
        visitedCountries: visitedCountries,
        desiredCountry: desiredCountry
      });
  
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("X-STUDENT-HEADER", "IANCU_ELENA");
  
      const requestOptions = {
        method: "POST",
        headers: headers,
        body: requestBody
      };
  
  
      fetch("https://api.bwt.ro/api/dev/FE/post", requestOptions)
        .then(resp => {
          if (!resp.ok) {
            throw new Error("Network response was not ok");
          }
          return resp.json();
        })
        .then(data => {
          console.log("Response from server:", data);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    });
  
  }