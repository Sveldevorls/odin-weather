const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

const weatherDescriptions = {
	0: "Clear sky",
	1: "Mostly clear",
	2: "Partly cloudy",
	3: "Overcast",
	45: "Fog",
	48: "Rime fog",
	51: "Light drizzle",
	53: "Drizzle",
	55:	"Heavy drizzle",
	56: "Light freezing drizzle",
	57: "Heavy freezing drizzle",
	61: "Light rain",
	63: "Rain",
	65: "Heavy rain",
	66: "Light freezing rain",
	67: "Heavy freezing rain",
	71: "Light snow",
	73: "Snow",
	75: "Heavy snow",
	77:	"Snow grains",
	80: "Light showers",
	81: "Showers",
	82:	"Heavy showers",
	85: "Light snow showers",
	86: "Heavy snow showers",
	95: "Thunderstorm",
	96: "Thunderstorm with light hail",
	99: "Thunderstorm with heavy hail",
}


export const getLocationCoord = async (location) => {
    try {
        const response = await fetch(GEOCODING_API + `?name=${location}`);
        const data = await response.json();
        
        if (data.hasOwnProperty("results")) {
            return [data.results[0]["latitude"].toFixed(2),
                    data.results[0]["longitude"].toFixed(2)]
        } else {
            throw new Error(`Unknown location "${location}"`)
        }
    }
    catch (error) {
        throw error
    }
}

export const getWeather = async (lat, long) => {
    try {
        const response = await fetch(
            WEATHER_API +
            `?latitude=${lat}&longitude=${long}` +
            "&current=temperature_2m,weather_code&timeformat=unixtime"
        );
        const data = await response.json();
        return data
    }
    catch (error) {
        throw error
    }
}

export const showWeather = (location, weatherData) => {
    const weatherMainDiv = document.createElement("div");
    weatherMainDiv.classList.add("weather-current");

    const weatherLocation = document.createElement("h2");
    weatherLocation.innerText = location.charAt(0).toUpperCase() + location.slice(1);

    const weatherTemperature = document.createElement("h1");
    weatherTemperature.innerText = weatherData.current.temperature_2m + weatherData.current_units.temperature_2m;

    const weatherDescription = document.createElement("h2");
    weatherDescription.innerText = weatherDescriptions[weatherData.current.weather_code];

    const weatherUpdateTime = document.createElement("p");
    const lastUpdateTime = new Date(weatherData.current.time * 1000);
    const currentTime = new Date()
    const differenceInMinutes = Math.floor((currentTime - lastUpdateTime) / 1000 / 60);
    let differenceString;
    switch (differenceInMinutes) {
        case 0:
            differenceString = "less than a minute ago";
            break
        case 1:
            differenceString = "1 minute ago";
            break
        default:
            differenceString = `${differenceInMinutes} minutes ago`
    }
    weatherUpdateTime.innerText = "Last updated " + differenceString;

    weatherMainDiv.append(
        ...[weatherLocation,
            weatherTemperature,
            weatherDescription,
            weatherUpdateTime]
    )

    return weatherMainDiv
}