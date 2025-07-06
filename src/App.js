
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import './App.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    const data = await res.json();
    setRecipes(data.meals || []);
  };

  return (
    <div className="App">
      <h1>Recipe Search App</h1>
      <SearchBar search={search} setSearch={setSearch} handleSearch={handleSearch} />
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default App;
