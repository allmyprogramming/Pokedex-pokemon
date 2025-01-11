let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Add Pokémon to the list
  function add(pokemon) {
    if (typeof pokemon === "object" && pokemon !== null && !Array.isArray(pokemon)) {
      if (pokemon.name && pokemon.detailsUrl) {
        pokemonList.push(pokemon);
      } else {
        console.error("Invalid Pokémon object. Ensure it contains 'name' and 'detailsUrl'.");
      }
    } else {
      console.error("Invalid input. Only objects are allowed.");
    }
  }

  // Get all Pokémon in the list
  function getAll() {
    return pokemonList;
  }

  // Add a Pokémon list item to the DOM
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    listItem.classList.add('list-group-item', 'text-center'); 

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-primary", "w-100"); 

    // Event listener for showing details when a Pokémon name is clicked
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
  }

  // Load Pokémon list from the API
  function loadList() {
    return fetch(apiUrl)
      .then(response => response.json())
      .then(json => {
        json.results.forEach(item => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(e => console.error("Error loading Pokémon list:", e));
  }

  // Load Pokémon details (name, image, height, types)
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(response => response.json())
      .then(details => {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types.map(typeInfo => typeInfo.type.name);
      })
      .catch(e => console.error("Error loading Pokémon details:", e));
  }

  // Show details in the Bootstrap modal
  function showDetails(pokemon) {
    // Show the spinner while being loaded
    let modalBody = document.querySelector('.modal-body');
    let loadingSpinner = document.querySelector('#loadingSpinner');
    let modalText = document.querySelector('#pokemonModalText');
    let modalImage = document.querySelector('#pokemonModalImage');

    loadingSpinner.classList.remove('d-none'); // Show the spinner
    modalText.classList.add('d-none'); // Hide the text
    modalImage.classList.add('d-none'); // Hide the image

    loadDetails(pokemon).then(function () {
      // Hide the spinner once the details are loaded
      loadingSpinner.classList.add('d-none');

      // Show the text and image
      modalText.classList.remove('d-none');
      modalImage.classList.remove('d-none');
      modalText.innerHTML = `Height: ${pokemon.height} m<br>Types: ${pokemon.types.join(", ")}`;
      modalImage.src = pokemon.imageUrl;
      modalImage.alt = pokemon.name;

      // Show the modal
      let modalTitle = document.querySelector('#pokemonModalLabel');
      modalTitle.innerText = `Details for ${pokemon.name}`;

      let modal = new bootstrap.Modal(document.querySelector('#pokemonModal'));
      modal.show();
    }).catch(function (error) {
      console.error("Error displaying Pokémon details:", error);
      loadingSpinner.classList.add('d-none');
      modalText.classList.remove('d-none');
      modalText.innerHTML = "Error loading details. Please try again later.";
    });
  }


  function showModal(title, text, imageUrl) {
    let modalTitle = document.querySelector('#pokemonModalLabel');
    let modalText = document.querySelector('#pokemonModalText');
    let modalImage = document.querySelector('#pokemonModalImage');

    modalTitle.innerText = title;
    modalText.innerHTML = text;
    modalImage.src = imageUrl;
    modalImage.alt = title;

    let modal = new bootstrap.Modal(document.querySelector('#pokemonModal'));
    modal.show();
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

// Load Pokémon list and display on the page
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
