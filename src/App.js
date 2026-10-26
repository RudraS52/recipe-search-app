
import React, { useState, useRef, useEffect } from 'react';

// Import the main UI components.
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import Header from './components/Header';
import Footer from './components/Footer';

// Import styles for recipe cards, the recipe list, and search bar.
import './components/RecipeCard.css';
import './components/RecipeList.css';
import './components/SearchBar.css';

// Load the Poppins font for consistent typography.
import '@fontsource/poppins';

// Import global application styles.
import './App.css';

const App = () => {
  // Stores the current text entered in the search box.
  const [search, setSearch] = useState('');

  // Stores the recipes returned by TheMealDB API.
  const [recipes, setRecipes] = useState([]);

  // Stores recipe names displayed in the autocomplete dropdown.
  const [suggestions, setSuggestions] = useState([]);

  // Tracks whether the main recipe search request is in progress.
  const [isLoading, setIsLoading] = useState(false);

  // Stores an error message when a search request fails.
  const [error, setError] = useState('');

// Stores the autocomplete debounce timer between renders.
const debounceTimer = useRef(null);

// Identifies the latest input so outdated responses can be ignored.
const latestRequestId = useRef(0);

// Clears the pending timer when the component unmounts.
useEffect(() => {
  return () => {
    clearTimeout(debounceTimer.current);
  };
}, []);

  // Handles form submission and fetches recipes matching the search query.
  const handleSearch = async (e) => {
    // Prevent the browser from reloading the page on form submission.
    e.preventDefault();

    // Remove leading and trailing spaces from the search query.
    const query = search.trim();

    // Validate the query before making an API request.
    if (!query) {
      setRecipes([]);
      setSuggestions([]);
      setError('Please enter a recipe name to search.');
      return;
    }

    // Reset previous results and errors before starting a new search.
    setIsLoading(true);
    setError('');
    setSuggestions([]);

    try {
      // Build the API URL and encode the query to handle spaces
      // and special characters safely.
      const url =
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;

      // Send a request to TheMealDB API.
      const res = await fetch(url);

      // fetch() does not reject automatically for HTTP error status codes.
      if (!res.ok) {
        throw new Error('Unable to fetch recipes. Please try again.');
      }

      // Parse the response body as JSON.
      const data = await res.json();

      // TheMealDB returns meals as an array, or null when no meals match.
      // Use an empty array to keep the recipe state consistent.
      setRecipes(data.meals || []);
    } catch (err) {
      // Clear results if the main search request fails.
      setRecipes([]);

      // Store an error message for display in the UI.
      setError(
        err.message || 'Something went wrong. Please try again.'
      );
    } finally {
      // Always stop the loading indicator after success or failure.
      setIsLoading(false);
    }
  };

  // Fetches matching recipe names as the user types in the search box.
  
  // Fetches autocomplete suggestions after the user pauses typing.
  const handleInputChange = (e) => {
    const value = e.target.value;

    // Update the input immediately so typing stays responsive.
    setSearch(value);

    // Cancel the previous timer whenever the user types again.
    clearTimeout(debounceTimer.current);

    // Invalidate responses associated with earlier input.
    const requestId = ++latestRequestId.current;

    // Clear suggestions and errors when the input is empty.
    if (!value.trim()) {
      setSuggestions([]);
      setError('');
      return;
    }

    // Wait 300 ms after the last keystroke before requesting suggestions.
    debounceTimer.current = setTimeout(async () => {
      try {
        const url =
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(value.trim())}`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error('Unable to load suggestions.');
        }

        const data = await res.json();

        // Ignore results if the user has typed something newer.
        if (requestId !== latestRequestId.current) {
          return;
        }

        // Extract recipe names for the autocomplete dropdown.
        const names = (data.meals || []).map(
          (meal) => meal.strMeal
        );

        setSuggestions(names);
      } catch (err) {
        // Only update suggestions for the latest input.
        if (requestId === latestRequestId.current) {
          setSuggestions([]);
        }
      }
    }, 300);
  };


  return (
    // Root container for the entire application.
    <div className="App">

      {/* Displays the application branding and tagline. */}
      <Header />

      {/* Provides recipe search input and autocomplete suggestions. */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        handleInputChange={handleInputChange}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
      />

      {/* Short introduction displayed above the recipe results. */}
      <p className="tagline">
        {/* Discover delicious recipes for every occasion. */}
      </p>

      {/* Conditional rendering displays the appropriate UI state. */}
      {isLoading ? (
        // Displayed while the submitted recipe search is in progress.
        <div className="status-message" role="status">
          Searching for delicious recipes...
        </div>
      ) : error ? (
        // Displayed when the main search fails or the query is invalid.
        <div className="status-message error-message" role="alert">
          {error}
        </div>
      ) : recipes.length === 0 ? (
        // Displayed before the first search or when there are no results.
        <div className="empty-state">
          <img
            // Loads the illustration from the public folder.
            src={`${process.env.PUBLIC_URL}/cooking.png`}
            alt="Illustration of someone cooking"
            className="empty-image"
          />

          <p>Start by searching for your favorite dish above 🍜</p>
        </div>
      ) : (
        // Pass the fetched recipes to RecipeList for card rendering.
        <RecipeList recipes={recipes} />
      )}

      {/* Displays the application footer. */}
      <Footer />
    </div>
  );
};

export default App;
