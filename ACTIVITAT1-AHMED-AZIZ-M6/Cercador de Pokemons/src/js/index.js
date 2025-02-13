const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon/";
const pokemonList = document.querySelector(".pokemons");
const resultCountSelector = document.querySelector("#resultat");
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");
let currentPage = 1;
let limit = 10;

async function pokeapi(limit = 10, page = 1) {
    const offset = (page - 1) * limit;
    pokemonList.innerHTML = ''; // esborrar la llista de pokemons abans de carregar-ne de nous
    for (let i = offset + 1; i <= offset + limit; i++) {
        try {
            const response = await fetch(`${URL_POKEMON}${i}`);
            if (!response.ok) throw new Error(`Error en obtenir el Pokémon ${i}`);
            const data = await response.json();
            crearCard(data);
        } catch (error) {
            console.error(error);
        }
    }
    updateButtons();
}

function crearCard(pokemon) {
    const card = document.createElement("div"); 
    card.classList.add("card");

    const gif = document.createElement("img");
    gif.src = pokemon.sprites.versions["generation-v"]["black-white"].animated.front_shiny;
    gif.alt = pokemon.name;
    card.appendChild(gif);

    const name = document.createElement("h2");
    name.textContent = pokemon.name;
    card.appendChild(name);

    const button = document.createElement("button");
    button.textContent = "info";
    button.onclick = () => {
        window.location.href = `details.html?name=${pokemon.name}`;
    };
    card.appendChild(button);

    pokemonList.appendChild(card); 
}

resultCountSelector.addEventListener("change", (event) => {
    limit = parseInt(event.target.value);
    currentPage = 1;
    pokeapi(limit, currentPage);
});

nextButton.addEventListener("click", () => {
    currentPage++;
    pokeapi(limit, currentPage);
});

prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        pokeapi(limit, currentPage);
    }
});

function updateButtons() {
    prevButton.disabled = currentPage === 1;
    // Suposant que hi ha 898 Pokemon a l'API
    nextButton.disabled = currentPage * limit >= 898;
}

// Carrega inicial
pokeapi(limit, currentPage);