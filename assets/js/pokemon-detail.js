const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const pokemonDetail = document.getElementById('pokemon-detail');

const loadPokemon = () => {
  pokeApi.getPokemonById(id).then((pokemon) => {
    const newHtml = `
      <div class="detail-header ${pokemon.type}">
        <a class="back-link" href="index.html">←</a>

        <div class="title">
          <span class="name">${pokemon.name}</span>
          <span class="number">#${pokemon.number.toString().padStart(3, '0')}</span>
        </div>

        <ol class="types">
          ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>

        <div class="picture">
          <img src="${pokemon.picture}" alt="${pokemon.name}">
        </div>
      </div>

      <div class="detail-body">
        <table>
          <tr>
            <th>Height</th>
            <td>${pokemon.height} m</td>
          </tr>
          <tr>
            <th>Weight</th>
            <td>${pokemon.weight} kg</td>
          </tr>
          <tr>
            <th>Abilities</th>
            <td class="abilities">${pokemon.abilities.join(', ')}</td>
          </tr>
        </table>

        <table>
          ${pokemon.stats
            .map(
              (stat) =>
                `<tr>
              <th class="stat-name">${stat[0]}</th>
              <td class="stat-value">${stat[1]}</td>
              <td class="stat-container">
                <div class="stat-bar stat-background">
                  <div class="stat-bar ${stat[0]}" style="width: ${(100 * stat[1]) / 255}%;"></div>
                </div>
              </td>
            </tr>`
            )
            .join('')}
        </table>
      </div>
      `;

    pokemonDetail.innerHTML = newHtml;
  });
};

loadPokemon();
