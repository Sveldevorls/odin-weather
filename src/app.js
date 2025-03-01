const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";

export const getLocationCoord = async (location) => {
    try {
        const response = await fetch(GEOCODING_API + `?name=${location}`);
        const data = await response.json();
        
        if (data.hasOwnProperty("results")) {
            return [data.results[0]["latitude"], data.results[0]["longitude"]]
        } else {
            return new Error(`${location} not found`);
        }
    } catch (error) {
        return error
    }
}

