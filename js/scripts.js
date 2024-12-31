let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === "object" && pokemon !== null && !Array.isArray(pokemon)) {
      if (pokemon.name && pokemon.detailsUrl) {
        pokemonList.push(pokemon);
      } else {
        console.log("Invalid Pokémon object. Ensure it contains 'name' and 'detailsUrl'.");
      }
    } else {
      console.log("Invalid input. Only objects are allowed.");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");

    button.addEventListener("click", function (event) {
      showDetails(pokemon);  // Show Pokémon details when clicked
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
    button.classList.add("button-class");
    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types.map((typeInfo) => typeInfo.type.name);  // Extracting the type names
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(`Name: ${pokemon.name}`);
      console.log(`Height: ${pokemon.height}`);
      console.log(`Types: ${pokemon.types.join(", ")}`);
      console.log(`Image URL: ${pokemon.imageUrl}`);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

// Load the Pokémon list and add items to the DOM
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
