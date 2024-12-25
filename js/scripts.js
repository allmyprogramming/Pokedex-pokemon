let pokemonRepository = (function () {
  pokemonList = [
    { name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Poison'], hp: 45, attack: 49 },
    { name: 'Charmander', height: 0.6, type: ['Fire'], hp: 39, attack: 52 },
    { name: 'Charizard', height: 1.7, type: ['Fire', 'Flying'], hp: 78, attack: 84 },
    { name: 'Squirtle', height: 0.5, type: ['Water'], hp: 44, attack: 48 },
    { name: 'Blastoise', height: 1.6, type: ['Water'], hp: 79, attack: 83 },
    { name: 'Pidgey', height: 0.3, type: ['Flying', 'Normal'], hp: 40, attack: 45 },
    { name: 'Rattata', height: 0.3, type: ['Normal'], hp: 30, attack: 56 },
    { name: 'Pikachu', height: 0.4, type: ['Electric'], hp: 35, attack: 55 }
];  

    function add(pokemon) {
      if (typeof pokemon === "object" && pokemon !== null && !Array.isArray(pokemon)) {
        if(pokemon.name && pokemon.height && pokemon.type && pokemon.hp && pokemon.attack) {
        let height = pokemon.height;
        let name = pokemon.name;
        let type = pokemon.type;
        let hp = pokemon.hp;
        let attack = pokemon.attack;    


        pokemonList.push(pokemon);

        document.write(
          `Name: ${name}, Height: ${height}, Type: ${type}, HP: ${hp}, Attack: ${attack},<br>`);
        } else {
        
        document.write("Invalid Pokémon object. Ensure it contains 'name', 'height', 'type', hp and attack.<br>");
      } // Display error if properties are missing
    }else {
        document.write("Invalid input. Only objects are allowed.<br>");
      } // Show an error message if input is not an object
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
  let hp = pokemon.hp;
  let attack = pokemon.attack;  

  if (height > 1.6) {
    document.write(
        `Name: ${name}, Height: ${height},\u00A0\u00A0Wow! That's a big Pokémon. Type: ${type}, HP: ${hp}, Attack: ${attack}<br>`
    );
} else {
    document.write(
        `Name: ${name}, Height: ${height}, Type: ${type}, HP: ${hp}, Attack: ${attack}<br>`
    );
}
})
/*\u00A0 is a Unicode escape sequence that represents a non-breaking space*/

pokemonRepository.add({ name: "Ivysaur", height: 1.0, type: ['Grass', 'Poison'], hp: 60, attack: 62 });

