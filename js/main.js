"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Darlyng Leyton Bueno
 */

/*hämta element från DOM*/
const searchForm = document.querySelector("#searchform"); //formuläret
const searchInput = document.querySelector("#search"); // sökfältet
const errorMessage = document.querySelector("#error")
const messageSection = document.querySelector("#message");
const recipeSection = document.querySelector("#recipe");

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

    try {
        // skapa API adressen och hämta data
        const url = `https://dummyjson.com/recipes/search?q=${searchText}`;
        const response = await fetch(url); //skickar förfrågan till API

        //kontrollera om API lyckades
        if (!response.ok) {
            throw new Error("inget recept hittades, prova en ny sökfras.")
        }
        //omvandla json till javascript
        const data = await response.json();
        console.log(data);

        //kontrollerar om recept hittades
        if (data.recipes.length === 0) {
            messageSection.textContent = ("inga recept hittades, prova en ny sökfras."); //kontrollerar om receptet hittades
            return;

        }

        return data; //anropa funktionen
    } catch (error) { //hanterar fel om det uppstår vid hämtning av data
        console.error("tekniskt fel", error);

    }

}
/*visa recept på sidan*/
function renderRecipe(recipe) {

    //article
    const article = document.createElement("article"); //skapa ny element

    //rubrik
    const title = document.createElement("h3");
    title.textContent = recipe.name;
    article.appendChild(title);

    //bilder
    const image = document.createElement("img");
    image.src = recipe.image;
    image.alt = recipe.name;
    article.appendChild(image);

    //recept info
    const info = document.createElement("div");
    info.classList.add("recipe-info");


    //lägger till recept information på sidan
    const recipeInfo = [ //skapade array med recept info
        `Servings: ${recipe.servings}`,
        `Prep time: ${recipe.prepTimeMinutes} minutes`,
        `cooking time: ${recipe.cookTimeMinutes} minutes`,
        `Difficulty: ${recipe.difficulty}`

    ];

    recipeInfo.forEach(function (text) { //går igenom arrayen
        const information = document.createElement("p"); //skapar ny p element
        information.textContent = text;
        info.appendChild(information);
    });

    //lägger till informationen
    article.appendChild(info);
    recipeSection.appendChild(article);//lägger in hela receptet

    /*ingredienser*/
    const ingredientsTitle = document.createElement("h4"); //skapar rubrik
    ingredientsTitle.textContent = "Ingredients";
    article.appendChild(ingredientsTitle);

    //skapar punktlista för ingredienserna
    const ingredientsList = document.createElement("ul");

    recipe.ingredients.forEach(function (ingredient) { //går igenom varje ingrediens och instruktion
        const item = document.createElement("li"); //skapar ny li elemnt
        item.textContent = ingredient;
        ingredientsList.appendChild(item);
    });

    // lägger till ingredienserna
    article.appendChild(ingredientsList);


    /*instruktioner*/
    const instructionsTitle = document.createElement("h4"); //skapar rubrik
    instructionsTitle.textContent = "Instructions";
    article.appendChild(instructionsTitle);

    //skapar en numreradlista för instruktioner
    const instructionsList = document.createElement("ol");

    recipe.instructions.forEach(function (instruction) {
        const item = document.createElement("li"); //skapar ny li elemnt
        item.textContent = instruction;
        instructionsList.appendChild(item);
    });

    //lägger till instruktionerna
    article.appendChild(instructionsList);

}


/*eventlyssnare*/
searchForm.addEventListener("submit", async function (event) { //lyssnar när formuläret skickas
    event.preventDefault(); //sidan laddas ej om

    /*hämta det som användaren har skrivit*/
    const searchText = searchInput.value.trim(); //hämtar text från sökfältet

    if (!validateForm(searchText)) {
        return;
    }

    //tar bort eventuella felmeddelanden
    messageSection.textContent = "";
    recipeSection.innerHTML = "";

    //hämtar receptet från API
    const data = await fetchData(searchText);
    
    if (!data) { //avbryts om inget recept hittades
        return;

    }
    // hämtar första receptet
    const recipe = data.recipes[0];
    //visar receptet på sidan
    renderRecipe(recipe);
});