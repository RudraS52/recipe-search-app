
import React from 'react';

const SearchBar = ({
  search,
  setSearch,
  handleSearch,
  handleInputChange,
  suggestions,
  setSuggestions,
}) => {
  const handleSuggestionClick = (selectedItem) => {
    setSearch(selectedItem);
    setSuggestions([]);
  };

  return (
    <div className="search-bar">
      <form
        onSubmit={handleSearch}
        className="search-form"
        role="search"
      >
        <div className="input-wrapper">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>

          <label className="visually-hidden" htmlFor="recipe-search">
            Search recipes or ingredients
          </label>

          <input
            id="recipe-search"
            type="text"
            placeholder="Search recipes, ingredients..."
            value={search}
            onChange={handleInputChange}
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls="recipe-suggestions"
            aria-expanded={suggestions.length > 0}
          />

          {suggestions.length > 0 && (
            <ul
              id="recipe-suggestions"
              className="suggestions-list"
              role="listbox"
              aria-label="Recipe suggestions"
            >
              {suggestions.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  role="option"
                  aria-selected={false}
                >
                  <button
                    type="button"
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(item)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-4-4" />
                    </svg>
                    <span>{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="search-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span>Search Recipes</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
