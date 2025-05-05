const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async () => {
    const response = await fetch(`${BASE_URL}/pokemon?limit=150`);
    if (!response.ok) throw new Error('Failed to fetch Pokémon list');
    return response.json();
};

export const fetchPokemonDetails = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch Pokémon details');
    return res.json();
};
