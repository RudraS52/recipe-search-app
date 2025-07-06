import React from 'react';

const SearchBar = ({ search, setSearch, handleSearch, handleInputChange, suggestions, setSuggestions }) => {

  const handleSuggestionClick = (selectedItem) => {
    setSearch(selectedItem);
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch} className="search-form">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={handleInputChange}
          />

          {/* Suggestions List */}
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((item, index) => (
                <li key={index} onClick={() => handleSuggestionClick(item)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
