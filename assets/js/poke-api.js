const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
const pokeApi = {};

const convertPokeApiDetailToPokemon = (pokeDetail) => {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.picture = pokeDetail.sprites.other['official-artwork'].front_default;

  return pokemon;
};

const convertPokeApiDetailToDetailedPokemon = (pokeDetail) => {
  const pokemon = convertPokeApiDetailToPokemon(pokeDetail);

  pokemon.height = pokeDetail.height / 10;
  pokemon.weight = pokeDetail.weight / 10;

  pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
  pokemon.stats = pokeDetail.stats.map((statSlot) => [statSlot.stat.name, statSlot.base_stat]);

  return pokemon;
};

pokeApi.getPokemonDetail = (pokemon) =>
  fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);

pokeApi.getPokemonList = (offset = 0, limit = 5) => {
  const url = `${baseUrl}?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemonList) => pokemonList.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails)
    .catch((error) => console.error(error));
};

pokeApi.getPokemonById = (id = 1) => {
  const url = `${baseUrl}/${id}`;

  return fetch(url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToDetailedPokemon)
    .catch((error) => console.error(error));
};
