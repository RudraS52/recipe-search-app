// SearchBar.js
import React from 'react';

const SearchBar = ({ search, setSearch, handleSearch }) => {
  return (
    <form onSubmit={handleSearch}>
      <input 
        type="text" 
        placeholder="Search Recipes..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
