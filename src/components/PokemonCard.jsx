import React from 'react';

const PokemonCard = ({ pokemon }) => {
    return (
        <div className='bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center'>
            <img
                src={pokemon.image}
                alt={pokemon.name}
                className='w-24 h-24 mx-auto'
            />
            <h2 className='text-lg font-bold capitalize'>{pokemon.name}</h2>
            <p className='text-gray-600'>#{pokemon.id}</p>
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
