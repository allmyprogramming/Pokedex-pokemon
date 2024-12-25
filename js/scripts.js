let pokemonList = [];
pokemonList = [
    { name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Poison'], HP: 45, Attack: 49 },
    { name: 'Charmander', height: 0.6, type: ['Fire'], HP: 39, Attack: 52 },
    { name: 'Charizard', height: 1.7, type: ['Fire', 'Flying'], HP: 78, Attack: 84 },
    { name: 'Squirtle', height: 0.5, type: ['Water'], HP: 44, Attack: 48 },
    { name: 'Blastoise', height: 1.6, type: ['Water'], HP: 79, Attack: 83 },
    { name: 'Pidgey', height: 0.3, type: ['Flying', 'Normal'], HP: 40, Attack: 45 },
    { name: 'Rattata', height: 0.3, type: ['Normal'], HP: 30, Attack: 56 },
    { name: 'Pikachu', height: 0.4, type: ['Electric'], HP: 35, Attack: 55 }
];
//pokemonlist array

/*function(pokemon) allows each element of pokemonList to the forEach function*/


pokemonList.forEach(function(pokemon){


  let height = pokemon.height;
  let name = pokemon.name;
  let type = pokemon.type;
  

  if (height > 1.6) {
    document.write(
        `Name: ${name}, Height: ${height}. 
        Wow! That's a big Pokémon. Type: ${type}<br>`
    );
} else {
    document.write(
        `Name: ${name}, Height: ${height}, Type: ${type}<br>`
    );
}
})

/*
let height = pokemonList[i].height;
let name = pokemonList[i].name;
let type = pokemonList[i].type;

    if (height > 1.6) {
        document.write(
            `Name: ${name}, Height: ${height}. Wow! That's a big Pokémon. Type: ${type}<br>`
        );
    } else {
        document.write(
            `Name: ${name}, Height: ${height}, Type: ${type}<br>`
        );
    }
}

*/


// loops through list and checks if pokemon is bigger that 1.6 meters and add
// wow thats a big Pokemon next to height.

/*
let pokemonRepository = (function () {
    let pokemonList = [];
  
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    function getAll() {
      return pokemonList;
    }
  
    return {
      add: add,
      getAll: getAll
    };
  })();
  */