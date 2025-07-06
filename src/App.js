import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import RecipeCard from './components/RecipeCard';
import './components/RecipeCard.css';
import './components/RecipeList.css';
import './components/SearchBar.css';
import '@fontsource/poppins'; // Import Poppins font


import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    const data = await res.json();
    setRecipes(data.meals || []);
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
    const data = await res.json();
    if (data.meals) {
      const names = data.meals.map(meal => meal.strMeal);
      setSuggestions(names);
    } else {
      setSuggestions([]);
    }
  };

  return (
  <div className="App">
    <Header />  {/* ✅ Add Header */}


<SearchBar
  search={search}
  setSearch={setSearch}
  handleSearch={handleSearch}
  handleInputChange={handleInputChange}
  suggestions={suggestions}
  setSuggestions={setSuggestions}
/>

{/* 👉 Tagline displayed below search bar */}
<p className="tagline">Find your favorite dishes from around the world!</p>


    {recipes.length === 0 ? (
      <div className="empty-state">
        <img src={`${process.env.PUBLIC_URL}/cooking.png`} alt="Cooking" className="empty-image" />
        <p>Start by searching for your favorite dish above 🍜</p>
      </div>
    ) : (
      <RecipeList recipes={recipes} />
    )}

    <Footer /> {/* ✅ Add Footer */}
  </div>
);

};

export default App;
