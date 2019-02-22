const numberButtons = document.querySelectorAll('.numberButton');
const submitButton = document.querySelector('.submitButton');
const clearButton = document.querySelector('.clearButton');
let pokemonNameDisplay = document.querySelector('.pokemonNameDisplay');
let pokemonInput = document.querySelector("input");
const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/';
var request = new XMLHttpRequest();


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

// function submitData(){
//   request.open('GET', pokeAPI + pokemonInput.value, true);
//   request.onload = function () {
//
//     // Begin accessing JSON data here
//     var data = JSON.parse(this.response);
//     if (request.status >= 200 && request.status < 400) {
//       pokemonNameDisplay.textContent = name;
//       // data.forEach(movie => {
//       //   const card = document.createElement('div');
//       //   card.setAttribute('class', 'card');
//       //
//       //   const h1 = document.createElement('h1');
//       //   h1.textContent = movie.title;
//       //
//       //   const p = document.createElement('p');
//       //   movie.description = movie.description.substring(0, 300);
//       //   p.textContent = `${movie.description}...`;
//       //
//       //   container.appendChild(card);
//       //   card.appendChild(h1);
//       //   card.appendChild(p);
//       // });
//     } else {
//       const errorMessage = document.createElement('marquee');
//       errorMessage.textContent = `Gah, it's not working!`;
//       app.appendChild(errorMessage);
//     }
//   }
//
//   request.send();
// }
