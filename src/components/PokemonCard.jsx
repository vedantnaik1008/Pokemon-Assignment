import React from 'react';
import typeGradients from '../utils/typeColors';

const PokemonCard = ({ pokemon }) => {
    const mainType = pokemon.types[0];
    const gradient = typeGradients[mainType] || 'from-gray-300 to-gray-500';
    return (
        <div
            className={`rounded-xl shadow-md text-white p-4 bg-gradient-to-br ${gradient} 
                  transform transition-transform duration-300 hover:scale-105 
                  hover:shadow-xl hover:shadow-${mainType}-500/40 animate-fade-in`}>
            <img
                src={pokemon.image}
                alt={pokemon.name}
                loading='lazy'
                className='w-28 h-w-28 mx-auto object-cover'
            />
            <h2 className='text-lg font-bold capitalize'>{pokemon.name}</h2>
            <p className='text-white'>#{pokemon.id}</p>
            <div className='flex justify-center gap-2 mt-2 flex-wrap'>
                {pokemon.types.map((type) => (
                    <span
                        key={type}
                        className='px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm'>
                        {type}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default PokemonCard;
