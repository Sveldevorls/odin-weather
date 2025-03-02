import "./style.css";
import { getLocationCoord } from "./app";

const searchForm = document.getElementById("form");
const searchBar = document.getElementById("search");

const errorDiv = document.body.querySelector(".error");
const weatherDiv = document.body.querySelector(".weather");

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        await getLocationCoord(searchBar.value)
        .then(res => {
            console.log(res);
            weatherDiv.innerText = `Lat: ${res[0]}, Long: ${res[1]}`
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