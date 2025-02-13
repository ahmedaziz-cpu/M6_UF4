const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon/";

async function fetchPokemonDetails(name) {
    const response = await fetch(`${URL_POKEMON}${name}`);
    const data = await response.json();
    displayPokemonDetails(data);
}

function displayPokemonDetails(pokemon) {
    const detailsContainer = document.querySelector(".pokemon-details");
    
    const name = document.createElement("h1");
    name.textContent = pokemon.name;
    detailsContainer.appendChild(name);

    const gif = document.createElement("img");
    gif.src = pokemon.sprites.front_default;
    gif.alt = pokemon.name;
    detailsContainer.appendChild(gif);

    const types = document.createElement("p");
    types.textContent = `Tipus: ${pokemon.types.map(type => type.type.name).join(', ')}`;
    detailsContainer.appendChild(types);

    const abilities = document.createElement("p");
    abilities.textContent = `Habilitats: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}`;
    detailsContainer.appendChild(abilities);

    const backButton = document.createElement("button");
    backButton.textContent = "Tornar";
    backButton.onclick = () => {   
        window.history.back();  
    };
    detailsContainer.appendChild(backButton);
}

const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('name');
if (pokemonName) {
    fetchPokemonDetails(pokemonName);
}