import React, { useState } from 'react';

const SearchableSelect = ({ options }: any) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setSelectedOption(inputValue);

    // Filter the options based on the input value
    const filtered = options.filter((option: any) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="searchable-select">
      <input
        type="text"
        value={selectedOption}
        placeholder="Search..."
        onChange={handleInputChange}
        onFocus={() => setIsDropdownOpen(true)}
      />
      {isDropdownOpen && (
        <ul className="options-list">
          {filteredOptions.map((option: any) => (
            <li key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableSelect;
