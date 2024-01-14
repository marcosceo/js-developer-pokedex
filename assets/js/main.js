const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modal = document.getElementById("dv-modal")

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span onclick="getPokemon()" class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function convertPokemonToCard(pokemon) {
    return `
    <div class="card">

    <div class="${pokemon.type} header">
      <div class="menu-top">
        <button onclick="closeModal()">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <span class="material-symbols-outlined">
          favorite
        </span>
      </div>
      <div class="detail">
        <div>
          <h1 class="name">${pokemon.name}</h1>
          <ol class="list">
          ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>
        </div>

        <span class="number">#${pokemon.number}</span>
      </div>

      <img src="${pokemon.photo}"
        alt="Imagem do ${pokemon.name}">
    </div>

    <div class="description">
      <div class="description-nav">
        <ul>
          <li>About</li>
          <li>Base Stats</li>
          <li>Evolution</li>
          <li>Moves</li>
        </ul>
      </div>
      <div class="description-main">
        <table>
          <tr>
            <th>Species</th>
            <td>${pokemon.species}</td>
          </tr>
          <tr>
            <th>Height</th>
            <td>${pokemon.height} cm</td>
          </tr>
          <tr>
            <th>Weight</th>
            <td>${pokemon.weight} kg</td>
          </tr>
          <tr>
            <th>Abilities</th>
            <td>
          ${pokemon.abilities.map((ability) => `${ability}`).join(", ")}
            </td>
          </tr>
          <tr>
            <th>Base Experience</th>
            <td>${pokemon.baseExperience}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
    `
}


async function getPokemon() {
    let name = event.target.innerHTML;
    let pokemon = await pokeApi.getPokemonByName(name)

    let newHtml = convertPokemonToCard(pokemon);
        modal.innerHTML = newHtml

    openModal();
   
}

function openModal() {
    let modal = document.getElementById('dv-modal');

    modal.style.display = 'Block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    let modal = document.getElementById('dv-modal');

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}
