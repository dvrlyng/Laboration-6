"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Darlyng Leyton Bueno
 */

/*hämta från DOM*/
const searchForm = document.querySelector("#searchForm"); //formuläret
const searchInput = document.querySelector("#search"); // sökfältet

/*eventlyssnare*/
searchForm.addEventListener("submit", function (event) { //lyssnar när formuläret skickas
    event.preventDefault(); //sidan laddas ej om

});
