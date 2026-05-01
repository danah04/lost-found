import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { authAPI } from "../../services/api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const data = await authAPI.login({
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("lfUser", JSON.stringify(data.user));

      navigate(`/${data.user.role}/dashboard`);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="public-page">
      <Navbar />

      <div className="landing-card">
        <h1 className="landing-title">Login</h1>
        <p className="landing-subtitle">Sign in to your account</p>

        <form className="landing-actions" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="primary-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
