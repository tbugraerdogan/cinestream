import React, { useState } from "react";
import "./Login.css";
import { login, signup } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const userAuth = async (event) => {
    event.preventDefault();
    setError(""); // Clear any previous errors

    try {
      if (signState === "Sign In") {
        const success = await login(email, password);
        if (success) {
          console.log("Login successful, navigating to /movies");
          navigate("/movies");
        } else {
          console.log("Login failed");
          setError("Invalid email or password");
        }
      } else {
        const success = await signup(name, email, password);
        if (success) {
          console.log("Signup successful, navigating to /movies");
          navigate("/movies");
        } else {
          console.log("Signup failed");
          setError("Failed to create account");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError(error.message || "Authentication failed");
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <div className="split-header">
          <span className="pink-text">CINE</span>
          <span className="stream-text">STREAM</span>
        </div>
        <h1 className="auth-title">{signState}</h1>
        {error && <div className="error-message">{error}</div>}
        <form className="forms" onSubmit={userAuth} autoComplete="on">
          {signState === "Sign Up" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              placeholder="Your Name"
              autoComplete="name"
              required
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Your Email"
            autoComplete="email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Your Password"
            autoComplete="current-password"
            required
          />
          <button type="submit">{signState}</button>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Cinestream?{" "}
              <span
                className="point"
                onClick={() => {
                  setSignState("Sign Up");
                  setError("");
                }}
              >
                Sign up
              </span>
            </p>
          ) : (
            <p>
              Have an account?{" "}
              <span
                className="point"
                onClick={() => {
                  setSignState("Sign In");
                  setError("");
                }}
              >
                Sign in
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
