import "./style.css";
import { getLocationCoord, getWeather, showWeather } from "./app";

const searchForm = document.getElementById("form");
const searchBar = document.getElementById("search");
const errorDiv = document.body.querySelector(".error");
const weatherDiv = document.body.querySelector(".weather");

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const location = searchBar.value;

    try {
        await getLocationCoord(location)
        .then(([lat, long]) => 
            getWeather(lat, long)
        )
        .then(weatherData => {
            weatherDiv.replaceChildren(showWeather(location, weatherData));
        })
    }
    catch (error) {
        setTimeout(() => {
            errorDiv.classList.remove("visible");
        }, 3000);
        errorDiv.classList.add("visible");
        errorDiv.innerText = `Error: ${error.message}`;
    }
});