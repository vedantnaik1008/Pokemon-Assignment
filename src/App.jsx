import PokemonCard from './components/PokemonCard';
import usePokemonData from './hooks/usePokemonData';
import './App.css';

const App = () => {
    const {
        filteredPokemons,
        searchTerm,
        setSearchTerm,
        selectedType,
        setSelectedType,
        loading,
        types
    } = usePokemonData();

    if (loading) {
        return (
            <div className='text-center mt-10 text-xl font-bold absolute top-1/2 left-1/2 -translate-1/2'>
                Loading Pokemon...
            </div>
        );
    }

    return (
        <>
            <img
                src='https://www.chromethemer.com/download/hd-wallpapers/pokemon-3840x2160.jpg'
                loading='lazy'
                alt='Background'
                className='fixed top-0 left-0 w-full h-full object-cover -z-10'
            />
            <div
                className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'
                style={{ fontFamily: 'Press Start 2P' }}>
                <h1 className='text-5xl sm:text-6xl font-extrabold text-white text-center mb-8'>
                    PokeDex
                </h1>

                <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mb-6'>
                    <input
                        type='text'
                        placeholder='Search Pokémon...'
                        className='border border-gray-300 bg-white rounded-md px-4 py-2 w-full sm:w-1/2'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className='border border-gray-300 bg-white rounded-md px-4 py-2 w-full sm:w-1/3'
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}>
                        {types.map((type) => (
                            <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {filteredPokemons.length === 0 ? (
                    <div className='text-2xl sm:text-3xl text-white font-bold text-center mb-6'>
                        No Pokémon found.
                    </div>
                ) : (
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                        {filteredPokemons.map((pokemon) => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default App;
