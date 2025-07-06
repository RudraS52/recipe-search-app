
import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h2>{recipe.strMeal}</h2>
      <p>{recipe.strInstructions.substring(0, 100)}...</p>
      <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">View Full Recipe</a>
    </div>
  );
};

export default RecipeCard;
