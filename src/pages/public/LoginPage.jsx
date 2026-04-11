import React from "react";

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <p>Sign in to your account</p>

      <form>
        <input type="email" placeholder="Email" />
        <br />
        <input type="password" placeholder="Password" />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
