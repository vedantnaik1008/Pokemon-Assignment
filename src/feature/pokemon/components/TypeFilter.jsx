import React from 'react'

const TypeFilter = ({selectedType, setSelectedType, types}) => {
  return (
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
  );
}

export default TypeFilter
