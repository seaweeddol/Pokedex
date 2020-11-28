const numberButtons = document.getElementById("numbers").querySelectorAll('button');
const submitButton = document.querySelector('#submit');
const clearButton = document.querySelector('#clear');
let pkmnNameDisplay = document.querySelector('#nameDisplay');
let pkmnSprite = document.querySelector('.pkmnSprite');
let pkmnDesc = document.querySelector('.pkmnDescription');
let pkmnTypeOne = document.querySelector('.typeOne');
let pkmnTypeTwo = document.querySelector('.typeTwo');
let pkmnInput = document.querySelector("input");
const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/';
let cache = {}

pokedexListener();

// listens for number button presses, and appends pressed number to input value
function pokedexListener(){
  for(var i = 0; i < numberButtons.length; i++){
    numberButtons[i].addEventListener("click", function(){
      pkmnInput.value += this.textContent;
    })
  }
}

// clears pkmnInput value
function clearData(){
  pkmnInput.value = "";
}

// event listener for clear button click
clearButton.addEventListener("click", function(){
  clearData();
})

submitButton.addEventListener("click", function() {
  submitData();
})

function submitData(){
  if (cache[pkmnInput.value]) {
    setUI(cache[pkmnInput.value]);
  } else {
    Promise.all([
      // handling multiple API calls solution from here: https://gomakethings.com/waiting-for-multiple-all-api-responses-to-complete-with-the-vanilla-js-promise.all-method/
      fetch('https://pokeapi.co/api/v2/pokemon/' + pkmnInput.value),
      fetch('https://pokeapi.co/api/v2/pokemon-species/' + pkmnInput.value)
    ]).then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(function (data) {
      const pkmnNum = pkmnInput.value;
      cache[pkmnNum] = {};
      cache[pkmnNum]["name"] = data[0].name;
      cache[pkmnNum]["spriteImg"] = data[0].sprites.front_default;
      for (i = 0; i < data[1].flavor_text_entries.length; i++) {
        if (data[1].flavor_text_entries[i].language.name == "en") {
          cache[pkmnNum]["description"] = data[1].flavor_text_entries[i].flavor_text;
          break;
        }
      }

      cache[pkmnNum]["typeOne"] = data[0].types[0].type.name;
      if (data[0].types[1]) {
        cache[pkmnNum]["typeTwo"] = data[0].types[1].type.name;
      }

      setUI(cache[pkmnInput.value]);
    }).catch(function (error) {
      // if there's an error, log it
      console.log(error);
    });
  }

  pkmnInput.value = "";
}

function setUI(pokemon) {
  pkmnNameDisplay.innerHTML = pokemon.name;
  pkmnSprite.src = pokemon.spriteImg;
  pkmnDescription.innerHTML = pokemon.description;      
  pkmnTypeOne.innerHTML = pokemon.typeOne;
  if (pokemon.typeTwo) {
    pkmnTypeTwo.innerHTML = pokemon.typeTwo;      
  } else {
    pkmnTypeTwo.innerHTML = "";      
  }
}