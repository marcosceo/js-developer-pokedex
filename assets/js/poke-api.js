
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    
    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    pokemon.abilities= abilities;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height * 10;
    pokemon.weight = pokeDetail.weight / 10;
    pokemon.baseExperience = pokeDetail.base_experience

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonByName = (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}/`;

    return fetch(url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
    .then((pokemon) =>  pokemon)
    
}