const pkmnImg = document.getElementById("pkmn-img");
pkmnImg.setAttribute("draggable", false);

let message = "Guess the pokemon";

const pkmnSelect = document.getElementById("pokemon-select");

const setPokemonChoices = (arr) => {
  pkmnSelect.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    const newOption = document.createElement("option");
    newOption.setAttribute("value", element);
    newOption.text = element;
    pkmnSelect.appendChild(newOption);
  }
};

let currentRandomPokemon;
let currentRandomPokemonNumber;
let currentChoices;
const setPokemonImg = () => {
  const randomPokemonNumber = Math.floor(Math.random() * pokemon.length);
  const randomPokemon = pokemon[randomPokemonNumber];
  pkmnImg.setAttribute(
    "src",
    `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${
      pokemon.indexOf(randomPokemon) + 1
    }.png`
  );
  currentRandomPokemon = randomPokemon;
  currentRandomPokemonNumber = randomPokemonNumber;

  setPokemonChoices(pokemon);
};

pkmnImg.addEventListener("error", function (event) {
  setPokemonImg();
});

const pkmnFilter = document.getElementById("pokemon-filter");
pkmnFilter.addEventListener("keyup", (event) => {
  currentChoices = pokemon.filter((pokemon) =>
    pokemon.toLowerCase().includes(pkmnFilter.value.toLowerCase())
  );
  setPokemonChoices(currentChoices);
});
// to do: fix nidoran names in pokemon.js

// log repeating pokemon
// for (let i = 0; i < pokemon.length; i++) {
//   const element = pokemon[i];
//   if (pokemon.indexOf(pokemon[i]) !== i) console.log(i + 2);
// }

setPokemonImg();

pkmnFilter.focus();

const guessButton = document.getElementById("guess");
const playAgain = document.getElementById("play-again");
guessButton.addEventListener("click", () => {
  const userGuess = pkmnSelect.value.toLowerCase();
  if (userGuess === currentRandomPokemon.toLowerCase()) {
    message = `Correct! It's ${currentRandomPokemon}`;
    document.getElementById("pokedex-list").append(currentRandomPokemon);
    const newBr = document.createElement("br");
    document.getElementById("pokedex-list").append(newBr);
  } else message = `Wrong! It's ${currentRandomPokemon}`;
  pkmnImg.style.transition = "2s";
  pkmnImg.style.filter = "brightness(100%)";
  document.getElementById("message").textContent = message;
  window.setTimeout(() => {
    guessButton.style.display = "none";
    playAgain.style.display = "inline-block";
  }, 500);
});

playAgain.addEventListener("click", () => {
  message = "Guess the Pokemon";
  document.getElementById("message").textContent = message;
  setPokemonImg();
  pkmnFilter.value = "";
  pkmnImg.style.transition = "none";
  pkmnImg.style.filter = "brightness(0%)";
  setPokemonChoices(pokemon);
  playAgain.style.display = "none";
  guessButton.style.display = "inline-block";
  pkmnFilter.focus();
});
