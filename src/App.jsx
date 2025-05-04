import React, { useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';
import './App.css'

const App = () => {
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [loading, setLoading] = useState(true);
    const [types, setTypes] = useState([]);

    // Fetch Pokémon
    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const res = await fetch(
                    'https://pokeapi.co/api/v2/pokemon?limit=150'
                );
                const data = await res.json();
                const promises = data.results.map(async (p) => {
                    const res = await fetch(p.url);
                    const details = await res.json();
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

                // Get unique types
                const allTypes = new Set();
                results.forEach((p) => p.types.forEach((t) => allTypes.add(t)));
                setTypes(['all', ...Array.from(allTypes)]);
            } catch (error) {
                console.error('Error fetching Pokémon:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    // Filter when searchTerm or selectedType changes
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

    if (loading) {
        return (
            <div className='text-center mt-10 text-xl'>Loading Pokémon...</div>
        );
    }

    return (
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
            <h1 className='text-3xl font-bold text-center mb-6'>
                Pokémon Explorer
            </h1>

            {/* Search + Filter */}
            <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mb-6'>
                <input
                    type='text'
                    placeholder='Search Pokémon...'
                    className='border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/2'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className='border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/3'
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Empty state */}
            {filteredPokemons.length === 0 ? (
                <div className='text-2xl sm:text-3xl font-bold text-center mb-6'>
                    No Pokemon found.
                </div>
            ) : (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                    {filteredPokemons.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
