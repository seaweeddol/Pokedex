const numberButtons = document.querySelectorAll('.numberButton');
const submitButton = document.querySelector('.submitButton');
const clearButton = document.querySelector('.clearButton');
let pokemonInput = document.querySelector("input");

pokedexListener();

// listens for number button presses, and appends pressed number to input value
function pokedexListener(){
  for(var i = 0; i < numberButtons.length; i++){
    numberButtons[i].addEventListener("click", function(){
      pokemonInput.value += this.textContent;
    })
  }
}

// clears pokemonInput value
function clearData(){
  pokemonInput.value = "";
}

// event listener for clear button click
clearButton.addEventListener("click", function(){
  clearData();
})
