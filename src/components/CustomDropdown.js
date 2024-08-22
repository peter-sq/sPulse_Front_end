import React, { useState } from 'react';

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    setFilteredOptions(
      options.filter(option =>
        option.name.toLowerCase().includes(searchTerm)
      )
    );
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearch('');
    setFilteredOptions(options); // Reset the filter when an option is selected
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="block w-full bg-blue-50 focus:bg-blue-100 border border-gray-300 rounded-md py-2 px-4 text-left flex items-center
  "
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? (
          <>
            <img src={value.logo} alt={value.name} className="inline-block w-6 h-4 mr-2" />
            {value.name}
          </>
        ) : (
          'Select a league'
        )}
        <span className="ml-auto">▼</span>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border-b border-gray-300"
          />
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => handleOptionClick(option)}
                >
                  <img src={option.logo} alt={option.name} className="inline-block w-6 h-4 mr-2" />
                  {option.name}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
