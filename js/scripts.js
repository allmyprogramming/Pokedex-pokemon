let pokemonRepository = (function () {
  let modalContainer = document.querySelector('#modal-container');
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Add Pokémon to the list
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

  // Get all Pokémon in the list
  function getAll() {
    return pokemonList;
  }

  // Add a Pokémon list item to the DOM
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
  
    button.innerText = pokemon.name;
    button.classList.add("button-class");
  
    // Alternate button colors (Gold and Blue)
    if (pokemonList.indexOf(pokemon) % 2 === 0) {
      button.classList.add("button-blue"); // Blue for even-indexed Pokémon
    } else {
      button.classList.add("button-gold"); // Gold for odd-indexed Pokémon
    }
  
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
      .catch(e => {
        console.error(e);
      });
  }

  // Load Pokémon details (name, image, height, types)
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(response => response.json())
      .then(details => {
        // Adding details to the Pokémon object
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types.map(typeInfo => typeInfo.type.name);
      })
      .catch(e => {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(`Name: ${pokemon.name}`);
      console.log(`Height: ${pokemon.height}`);
      console.log(`Types: ${pokemon.types.join(", ")}`);
      console.log(`Image URL: ${pokemon.imageUrl}`);
      
      // Now show the image in the modal
      showModal(
        `Details for ${pokemon.name}`,
        `Height: ${pokemon.height} m<br>Types: ${pokemon.types.join(", ")}`,
        pokemon.imageUrl // pass the image URL to the modal
      );
    });
  }
  
  function showModal(title, text, imageUrl) {
    // Clear all existing modal content
    modalContainer.innerHTML = '';
    
    let modal = document.createElement('div');
    modal.classList.add('modal');
  
    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
  
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;
  
    let contentElement = document.createElement('p');
    contentElement.innerHTML = text; // Allow HTML content to include line breaks
  
    let imageElement = document.createElement('img');
    imageElement.src = imageUrl; // Set the image URL for the Pokémon
    imageElement.alt = title; // Set alt text for accessibility
  
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement); // Append the image to the modal
    modalContainer.appendChild(modal);
  
    modalContainer.classList.add('is-visible');
  }
  
  // Hide the modal
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  // Listen for the Escape key to close the modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // Close modal if clicked outside the modal content
  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      hideModal();
    }
  });

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
