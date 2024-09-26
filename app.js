document.getElementById('fetchDataBtn').addEventListener('click', fetchLocationData);

function fetchLocationData() {
    fetch('https://api.zippopotam.us/us/33162') 
        .then(response => {
            return response.json(); 
        })
        .then(data => {
            displayLocationUsingMap(data); 
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function displayLocationUsingMap(data) {
    const locationDataDiv = document.getElementById('locationData');
    locationDataDiv.innerHTML = ''; 

    const countryInfo = document.createElement('div');
    countryInfo.classList.add('country-info');

    const postCode = document.createElement('h2');
    postCode.innerText = `Post Code: ${data['post code']}`;

    const countryName = document.createElement('p');
    countryName.innerText = `Country: ${data.country}`;

    const countryAbbreviation = document.createElement('p');
    countryAbbreviation.innerText = `Country Abbreviation: ${data['country abbreviation']}`;

    countryInfo.appendChild(postCode);
    countryInfo.appendChild(countryName);
    countryInfo.appendChild(countryAbbreviation);
    locationDataDiv.appendChild(countryInfo);

    const locationElements = data.places.map(place => {
        const locationDiv = document.createElement('div');
        locationDiv.classList.add('location');

        const locationName = document.createElement('h3');
        locationName.innerText = `Place Name: ${place['place name']}`;

        const locationState = document.createElement('p');
        locationState.innerText = `State: ${place['state']}`;

        const locationLongitude = document.createElement('p');
        locationLongitude.innerText = `Longitude: ${place['longitude']}`;

        const locationLatitude = document.createElement('p');
        locationLatitude.innerText = `Latitude: ${place['latitude']}`;

        locationDiv.appendChild(locationName);
        locationDiv.appendChild(locationState);
        locationDiv.appendChild(locationLongitude);
        locationDiv.appendChild(locationLatitude);

        return locationDiv; 
    });

    locationElements.forEach(locationElement => locationDataDiv.appendChild(locationElement));
}
