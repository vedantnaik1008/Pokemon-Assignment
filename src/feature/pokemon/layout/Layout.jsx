import React from 'react';
import usePokemonData from '../hooks/usePokemonData';
import Loading from '../components/Loading';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import PokemonList from '../components/PokemonList';

const Layout = () => {
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
        return <Loading />;
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
                className='offscreen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'
                style={{ fontFamily: 'Press Start 2P' }}>
                <h1 className='text-5xl sm:text-6xl font-extrabold text-white text-center mb-8'>
                    PokeDex
                </h1>

                <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mb-6'>
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                    <TypeFilter
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                        types={types}
                    />
                </div>

                {filteredPokemons.length === 0 ? (
                    <div className='text-2xl sm:text-3xl text-white font-bold text-center mb-6'>
                        No Pokemon found.
                    </div>
                ) : (
                    <PokemonList filteredPokemons={filteredPokemons} />
                )}
            </div>
        </>
    );
};

export default Layout;
