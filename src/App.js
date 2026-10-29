
import React, { useState, useRef, useEffect } from 'react';

// Import the main UI components.
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import Header from './components/Header';
import Footer from './components/Footer';

// Firebase authentication functions.
import { onAuthStateChanged, signOut } from "firebase/auth";

// Firebase authentication instance.
import { auth } from "./firebase";

// Login and Signup screens.
import Login from "./Login";
import Signup from "./Signup";

// Import styles for recipe cards, the recipe list, and search bar.
import './components/RecipeCard.css';
import './components/RecipeList.css';
import './components/SearchBar.css';

// Load the Poppins font for consistent typography.
import '@fontsource/poppins';

// Import global application styles.
import './App.css';


const App = () => {

  
  // Stores the currently signed-in Firebase user.
  // null means no user is signed in.
  const [user, setUser] = useState(null);

  // Controls whether the Login or Signup screen is displayed.
  const [authMode, setAuthMode] = useState("login");

  // Prevents the app from showing the login screen
  // briefly while Firebase checks the existing session.
  const [authLoading, setAuthLoading] = useState(true);

  // Stores errors related to authentication or logout.
  const [authError, setAuthError] = useState("");

  // Listen for Firebase login, logout, and session changes.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // currentUser contains the signed-in user, or null.
      setUser(currentUser);
      setAuthLoading(false);
    });

    // Stop listening when App unmounts.
    return () => unsubscribe();
  }, []);

  // Sign the current user out of Firebase.
  const handleLogout = async () => {
    try {
      setAuthError("");
      await signOut(auth);

      // onAuthStateChanged will detect the logout
      // and update the user state automatically.
    } catch (err) {
      setAuthError("Unable to log out. Please try again.");
    }
  };

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


  // Show a temporary message while Firebase checks the session.
  if (authLoading) {
    return <div className="App">Checking login status...</div>;
  }

  // If nobody is signed in, show Login or Signup instead
  // of the recipe search screen.
  if (!user) {
    return (
      <div className="App auth-page">
        
    {/* Reuse the logged-in page's header wrapper so the
    existing Header.css styling applies on the auth page. */}
    <div className="app-header-row auth-header-row">
       <Header />
      </div>

        {authError && <p role="alert">{authError}</p>}

        {/* Two-column layout: authentication form on the left,
            food photography panel on the right. */}
        <main className="auth-layout">
          {/* Left panel contains the existing Login or Signup form. */}
          <section className="auth-form-panel">
            {authMode === "login" ? (
              <Login
                onSwitchToSignup={() => {
                  setAuthError("");
                  setAuthMode("signup");
                }}
                onLoginSuccess={(signedInUser) => setUser(signedInUser)}
              />
            ) : (
              <Signup
                onSwitchToLogin={() => {
                  setAuthError("");
                  setAuthMode("login");
                }}
                onSignupSuccess={(newUser) => setUser(newUser)}
              />
            )}
          </section>

          {/* Right panel adds a decorative food image and welcome message. */}
          <aside className="auth-visual-panel">
            <div className="auth-visual-content">
              <h2>Good food starts here.</h2>
              <p>Discover recipes and find inspiration for your next meal.</p>
            </div>
          </aside>
        </main>
         <Footer />
      </div>
    );
  }

  return (
    // Root container for the logged-in recipe search application.
    <div className="App">

      {/* Header branding and account controls for the signed-in user. */}
      <div className="app-header-row">
        <Header />

        <div className="header-user">
          <span>Signed in as: {user.email}</span>
          <button type="button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>

      {/* Show any authentication or logout error to the user. */}
      {authError && (
        <p role="alert" className="error-message">
          {authError}
        </p>
      )}

      {/* Main content area for searching and displaying recipes. */}
      <main className="app-main">
        <SearchBar
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
          handleInputChange={handleInputChange}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
        />

        {/* Display the appropriate UI based on the search state. */}
        {isLoading ? (
          <div className="status-message" role="status">
            Searching for delicious recipes...
          </div>
        ) : error ? (
          <div className="status-message error-message" role="alert">
            {error}
          </div>
        ) : recipes.length === 0 ? (
          <div className="empty-state">
            <img
              src={`${process.env.PUBLIC_URL}/cooking.png`}
              alt="Illustration of someone cooking"
              className="empty-image"
            />

            <p>
              Start by searching for your favorite dish above 🍜
            </p>
          </div>
        ) : (
          // Render recipe cards after successful search results arrive.
          <RecipeList recipes={recipes} />
        )}
      </main>

      {/* Footer shared by the logged-in application. */}
      <Footer />
    </div>
  );

};

export default App;
