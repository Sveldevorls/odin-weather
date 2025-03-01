import "./style.css";
import { getLocationCoord } from "./app";

const searchBar = document.getElementById("search");
const submitButton = document.getElementById("submit");

const result = document.body.querySelector(".result");

submitButton.addEventListener("click", () => {
    getLocationCoord(searchBar.value)
    .then(res => {
        res instanceof Array ?
            result.innerText = `Lat: ${res[0]}, Long: ${res[1]}` :
            result.innerText = `Error: ${res.message}`;
    })

    }
);