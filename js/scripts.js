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

for (let i = 0; i < pokemonList.length; i++) {
    document.write(

        `Name: ${pokemonList[i].name}, Height: ${pokemonList[i].height}, Type: ${pokemonList[i].type.join(', ')}<br>`
    );
}

//displays list to index page .join method used to add array into a single string.
//$ symbol is used for templeate literals to embed expressions into strings.
//template literals are enclosed by backticks(`), and ${} is used to insert backticks
//variables or expressions within the string.


document.write("<br>");
//adds a break between the information given.


let newBig = pokemonList[0].height;  // height of the first Pokémon
let bigPokemon = pokemonList[0].name;  // name of the first Pokémon

for (let i = 1; i < pokemonList.length; i++) {
    if (pokemonList[i].height > newBig) {
        newBig = pokemonList[i].height; // Update the new biggest height
        bigPokemon = pokemonList[i].name; // Update the name of the biggest Pokémon
    }
}

//for loop goes through heights and selects the tallest

document.write("Wow! The biggest Pokémon is " + bigPokemon + " with a height of " + newBig + " meters.");
