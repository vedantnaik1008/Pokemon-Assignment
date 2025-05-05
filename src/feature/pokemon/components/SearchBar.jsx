import React from 'react'

const SearchBar = ({searchTerm, setSearchTerm}) => {
  return (
      
      <label htmlFor='search-input' className='w-full'>
          <input
              id='search-input'
              type='text'
              className='border border-gray-300 bg-white rounded-md px-4 py-2 w-full sm:w-1/2'
              placeholder='Search Pokemon...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-describedby='search-instruction'
          />
      </label>
  );
}

export default SearchBar
