let pokemonRepository = (function () 
    {
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
  

/*function(pokemon) allows each element of pokemonList to the forEach function*/

pokemonRepository.getAll().forEach(function(pokemon){

  let height = pokemon.height;
  let name = pokemon.name;
  let type = pokemon.type;  

  if (height > 1.6) {
    document.write(
        `Name: ${name}, Height: ${height}.\u00A0\u00A0Wow! That's a big Pokémon. Type: ${type}<br>`
    );
} else {
    document.write(
        `Name: ${name}, Height: ${height}, Type: ${type}<br>`
    );
}
})
/*\u00A0 is a Unicode escape sequence that represents a non-breaking space*/

pokemonRepository.add({ name: "Ivysaur", height: 1.0, type: ['Grass', 'Poison'], HP: 60, Attack: 62 });

document.write("<br>Updated Pokémon List:<br>");
pokemonRepository.getAll().forEach(function (pokemon) {
  document.write(
    `Name: ${pokemon.name}, Height: ${pokemon.height}, Type: ${pokemon.type}<br>`
  );
});