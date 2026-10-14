"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Darlyng Leyton Bueno
 */

/*hämta element från DOM*/
const searchForm = document.querySelector("#searchform"); //formuläret
const searchInput = document.querySelector("#search"); // sökfältet
const errorMessage = document.querySelector("#error")

/*validering av formulär*/
function validateForm(searchText) {
    if (searchText === "") { //kontrollerar sökfältet är tomt
        errorMessage.textContent = "du måste fylla i en sökfras!";

        return false; //avbryt om det inte finns text
    }

    errorMessage.textContent = ""; //ta bort felmeddelande om text finns

    return true; //validering lyckades

}

/*hämta recept*/
async function fetchData(searchText) { //hämtar recept från API

    const url = `https://dummyjson.com/recipes/search?q=${searchText}`; //skapa API adressen med sökfras

    const response = await fetch(url); //skickar förfrågan till API
    const data = await response.json(); //omvandla json till javascript

    return data;


}








/*eventlyssnare*/
searchForm.addEventListener("submit", function (event) { //lyssnar när formuläret skickas
    event.preventDefault(); //sidan laddas ej om

    /*hämta det som användaren har skrivit*/
    const searchText = searchInput.value.trim(); //hämtar text från sökfältet

    if (!validateForm(searchText)) {
        return;
    }

});