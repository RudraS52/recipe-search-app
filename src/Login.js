
import { useState } from "react";
import "./Auth.css";
// Firebase function used to sign in an existing user.
import { signInWithEmailAndPassword } from "firebase/auth";

// Import the Firebase Authentication instance.
import { auth } from "./firebase";

// Props received from the parent component:
// onSwitchToSignup: switches to the signup screen.
// onLoginSuccess: runs after a successful login.
function Login({ onSwitchToSignup, onLoginSuccess }) {
  // Stores the email entered by the user.
  const [email, setEmail] = useState("");

  // Stores the password entered by the user.
  const [password, setPassword] = useState("");

  // Stores an error message if login fails.
  const [error, setError] = useState("");

  // Tracks whether Firebase is processing the login.
  const [loading, setLoading] = useState(false);

  // Runs when the user submits the login form.
  const handleLogin = async (e) => {
    // Prevent the browser from refreshing the page.
    e.preventDefault();

    // Clear any previous error message.
    setError("");

    // Indicate that login is in progress.
    setLoading(true);

    try {
      // Ask Firebase to authenticate the user with email and password.
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Login succeeded. Notify the parent component.
      onLoginSuccess(userCredential.user);
    } catch (err) {
      // Show a helpful message if the credentials are incorrect
      // or Firebase cannot complete the login.
      setError(
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
          ? "Incorrect email or password. Please try again."
          : "Login failed. Please check your details and try again."
      );
    } finally {
      // Stop the loading state whether login succeeds or fails.
      setLoading(false);
    }
  };

  // Render the login form.
  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      <p>Log in to access the Recipe Search App.</p>

      {/* Submit the form by calling handleLogin. */}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="login-email">Email</label>

          <input
            id="login-email"
            type="email"
            // Display the current email state.
            value={email}
            // Update email state whenever the user types.
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label htmlFor="login-password">Password</label>

          <input
            id="login-password"
            type="password"
            // Display the current password state.
            value={password}
            // Update password state whenever the user types.
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
        </div>

        {/* Display the error only if login fails. */}
        {error && <p role="alert">{error}</p>}

        {/* Disable the button while Firebase processes the login. */}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p>
        Don't have an account?{" "}

        {/* Ask the parent component to show Signup.js. */}
        <button type="button" onClick={onSwitchToSignup}>
          Sign Up
        </button>
      </p>
    </div>
  );
}

// Make Login available for import in App.js.
export default Login;
