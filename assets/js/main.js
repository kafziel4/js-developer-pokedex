const pokemonList = document.getElementById('pokemon-list');
const loadMoreButton = document.getElementById('load-more-button');

const maxRecords = 151;
const limit = 10;
let offset = 0;

const loadPokemonItems = (offset, limit) => {
  pokeApi.getPokemonList(offset, limit).then((pokemonResults = []) => {
    const newHtml = pokemonResults
      .map(
        (pokemon) =>
          `
          <a href="pokemon-detail.html?id=${pokemon.number}">
            <li class="pokemon ${pokemon.type}">
              <span class="number">#${pokemon.number.toString().padStart(3, '0')}</span>
              <span class="name">${pokemon.name}</span>

              <div class="detail">
                <ol class="types">
                  ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.picture}" alt="${pokemon.name}">
              </div>
            </li>
          </a>
        `
      )
      .join('');

    pokemonList.innerHTML += newHtml;
  });
};

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const recordsForNextPage = offset + limit;

  if (recordsForNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
});
