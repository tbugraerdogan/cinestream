import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="login-container">
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      <form>
        <div className="input-group">
          <label>Email:</label>
          <input type="email" required />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input type="password" required />
        </div>
        {isSignUp && (
          <div className="input-group">
            <label>Confirm Password:</label>
            <input type="password" required />
          </div>
        )}
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
      </form>
      <button onClick={toggleSignUp} className="toggle-button">
        {isSignUp
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default Login;
