
import { useState } from "react";
import "./Auth.css";

// Firebase function used to create a new user account with email and password.
import { createUserWithEmailAndPassword } from "firebase/auth";

// Import the Firebase Authentication instance initialized in firebase.js.
import { auth } from "./firebase";

// Parent component passes these two functions as props:
// onSwitchToLogin: switches the screen to Login.
// onSignupSuccess: tells the parent that signup succeeded.
function Signup({ onSwitchToLogin, onSignupSuccess }) {
  // Stores the email entered by the user.
  const [email, setEmail] = useState("");

  // Stores the password entered by the user.
  const [password, setPassword] = useState("");

  // Stores an error message if signup fails.
  const [error, setError] = useState("");

  // Tracks whether signup is in progress.
  // This helps prevent repeated submissions.
  const [loading, setLoading] = useState(false);

  // Runs when the user submits the signup form.
  const handleSignup = async (e) => {
    // Prevent the browser from refreshing the page on form submission.
    e.preventDefault();

    // Clear any previous error message.
    setError("");

    // Show that signup is in progress.
    setLoading(true);

    try {
      // Ask Firebase to create an account using the entered email
      // and password. trim() removes accidental spaces around the email.
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Signup succeeded. Firebase returns the newly created user.
      // Notify the parent component so it can show the recipe app.
      onSignupSuccess(userCredential.user);
    } catch (err) {
      // If Firebase rejects signup, display a user-friendly message.
      // Different error codes help explain common problems.
      setError(
        err.code === "auth/email-already-in-use"
          ? "This email is already registered. Please log in."
          : err.code === "auth/weak-password"
          ? "Please use a password with at least 6 characters."
          : err.code === "auth/invalid-email"
          ? "Please enter a valid email address."
          : "Signup failed. Please try again."
      );
    } finally {
      // Runs whether signup succeeds or fails.
      // Stop showing the loading state.
      setLoading(false);
    }
  };

  // Render the signup form.
  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <p>Sign up to access the Recipe Search App.</p>

      {/* When submitted, the form calls handleSignup. */}
      <form onSubmit={handleSignup}>
        <div>
          {/* htmlFor connects this label to the email input below. */}
          <label htmlFor="signup-email">Email</label>

          <input
            id="signup-email"
            type="email"
            // Display the current email state in the input.
            value={email}
            // Update email state whenever the user types.
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label htmlFor="signup-password">Password</label>

          <input
            id="signup-password"
            type="password"
            // Display the current password state.
            value={password}
            // Update password state whenever the user types.
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            autoComplete="new-password"
            // Browser-side validation: require at least 6 characters.
            minLength={6}
            required
          />
        </div>

        {/* Show the error only when an error message exists. */}
        {error && <p role="alert">{error}</p>}

        {/* Disable the button while Firebase is processing signup. */}
        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p>
        Already have an account?{" "}

        {/* Ask the parent component to switch to the login screen. */}
        <button type="button" onClick={onSwitchToLogin}>
          Log In
        </button>
      </p>
    </div>
  );
}

// Make Signup available for import in App.js.
export default Signup;
