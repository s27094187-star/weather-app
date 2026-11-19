async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const result = document.getElementById("weatherResult");

    if (!city) {
        result.innerHTML = "Pehle city likho!";
        return;
    }

    try {
        result.innerHTML = "Loading...";

        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            result.innerHTML = "City not found!";
            return;
        }

        const location = geoData.results[0];
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,precipitation,rain,snowfall,weather_code`);
        const data = await response.json();

        // YE BLOCK TRY KE ANDAR HONA CHAHIYE
        result.innerHTML = `
            <div class="weather-card">
                <h2>${location.name}</h2>
                <div class="temperature">
                    ${data.current.temperature_2m}°C
                </div>
                <div class="weather-details">
                    <div class="detail-card">
                        <span>💧</span>
                        <h3>Humidity</h3>
                        <p>${data.current.relative_humidity_2m}%</p>
                    </div>
                    <div class="detail-card">
                        <span>🌧️</span>
                        <h3>Rain</h3>
                        <p>${data.current.rain} mm</p>
                    </div>
                    <div class="detail-card">
                        <span>❄️</span>
                        <h3>Snowfall</h3>
                        <p>${data.current.snowfall} cm</p>
                    </div>
                </div>
            </div>
        `;

    } catch (error) { // Ab catch me sirf error wala code
        console.log(error);
        result.innerHTML = `<div class="welcome"><h2>Something went wrong!</h2><p>${error.message}</p></div>`;
    }
}