import { useEffect, useState } from 'react';
import { fetchPokemonDetails, fetchPokemonList } from '../services/pokemonApi';

const usePokemonData = () => {
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [loading, setLoading] = useState(true);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const data = await fetchPokemonList();

                const promises = data.results.map(async (p) => {
                    const details = await fetchPokemonDetails(p.url);
                    return {
                        id: details.id,
                        name: details.name,
                        image: details.sprites.front_default,
                        types: details.types.map((t) => t.type.name)
                    };
                });

                const results = await Promise.all(promises);
                setPokemons(results);
                setFilteredPokemons(results);

                const allTypes = new Set();
                results.forEach((p) => p.types.forEach((t) => allTypes.add(t)));
                setTypes(['all', ...Array.from(allTypes)]);
            } catch (error) {
                console.error('Error fetching Pokemon:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    useEffect(() => {
        const filtered = pokemons.filter((pokemon) => {
            const matchesSearch = pokemon.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesType =
                selectedType === 'all' || pokemon.types.includes(selectedType);
            return matchesSearch && matchesType;
        });

        setFilteredPokemons(filtered);
    }, [searchTerm, selectedType, pokemons]);

    return {
        pokemons,
        filteredPokemons,
        searchTerm,
        setSearchTerm,
        selectedType,
        setSelectedType,
        loading,
        types
    };
};

export default usePokemonData;
