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

  const userAuth = async (event) => {
    event.preventDefault();
    try {
      if (signState === "Sign In") {
        await login(email, password);
        navigate("/movies");
      } else {
        await signup(name, email, password);
        navigate("/movies");
      }
    } catch (error) {
      console.error("Authentication error:", error);
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
        <form className="forms" onSubmit={userAuth} autoComplete="on">
          {signState === "Sign Up" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              placeholder="Your Name"
              autoComplete="name"
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Your Email"
            autoComplete="email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Your Password"
            autoComplete="current-password"
          />
          <button type="submit">{signState}</button>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Cinestream?{" "}
              <span className="point" onClick={() => setSignState("Sign Up")}>
                Sign up
              </span>
            </p>
          ) : (
            <p>
              Have an account?{" "}
              <span className="point" onClick={() => setSignState("Sign In")}>
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
