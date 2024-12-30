let pokemonRepository = (function () {
  pokemonList = [
    { name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Poison'] },
    { name: 'Charmander', height: 0.6, type: ['Fire'] },
    { name: 'Charizard', height: 1.7, type: ['Fire', 'Flying'] },
    { name: 'Squirtle', height: 0.5, type: ['Water'] },
    { name: 'Blastoise', height: 1.6, type: ['Water'] },
    { name: 'Pidgey', height: 0.3, type: ['Flying', 'Normal'] },
    { name: 'Rattata', height: 0.3, type: ['Normal'] },
    { name: 'Pikachu', height: 0.4, type: ['Electric'] }
  ];

  function add(pokemon) {
    if (typeof pokemon === "object" && pokemon !== null && !Array.isArray(pokemon)) {
      if (pokemon.name && pokemon.height && pokemon.type) {
        let height = pokemon.height;
        let name = pokemon.name;
        let type = pokemon.type;


        pokemonList.push(pokemon);

        console.log(
          `Name: ${name}, Height: ${height}, Type: ${type}<br>`);
      } else {

        console.log("Invalid Pokémon object. Ensure it contains 'name', 'height', 'type'.<br>");
      } // Display error if properties are missing
    } else {
      console.log("Invalid input. Only objects are allowed.<br>");
    }
  }
  // Show an error message if input is not an object

  function getAll() {
    return pokemonList;
  }



  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");

    button.addEventListener("click", function (event) {
      let target = event.target;
      showDetail(pokemon);
    });

    button.addEventListener("mousedown", function (event) {
      let target = event.target;
      target.classList.add('button--red');
    });

    button.addEventListener("mouseleave", function (event) {
      let target = event.target;
      target.classList.remove('button--red');
    });


    button.innerText = pokemon.name;
    button.classList.add("button-class")
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }

  function showDetail(pokemon) {
    console.log(`Name: ${pokemon.name}`); // Show Pokémon name in console
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();


/*function(pokemon) allows each element of pokemonList to the forEach function*/

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
