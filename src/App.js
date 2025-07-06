import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import RecipeCard from './components/RecipeCard';
import './components/RecipeCard.css';
import './components/RecipeList.css';
import './components/SearchBar.css';
import './App.css';


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
    <div className="hero-section">
      <h1>🍽️ Recipe Search App</h1>
      <p>Discover delicious recipes from around the world!</p>
    </div>
    <SearchBar search={search} setSearch={setSearch} handleSearch={handleSearch} />

    {recipes.length === 0 ? (
      <div className="empty-state">
        <img src={`${process.env.PUBLIC_URL}/cooking.svg`} alt="Cooking" className="empty-image" />
        <p>Start by searching for your favorite dish above 🍜</p>
      </div>
    ) : (
      <RecipeList recipes={recipes} />
    )}
  </div>
);

};

export default App;
