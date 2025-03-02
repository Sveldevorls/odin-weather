const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

export const getLocationCoord = async (location) => {
    try {
        const response = await fetch(GEOCODING_API + `?name=${location}`);
        const data = await response.json();
        
        if (data.hasOwnProperty("results")) {
            return [data.results[0]["latitude"], data.results[0]["longitude"]]
        } else {
            throw new Error(`Unknown location "${location}"`)
        }
    }
    catch (error) {
        throw error
    }
}

export const getWeather = async (lat, long) => {
    console.log("123");
}

