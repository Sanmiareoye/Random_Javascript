import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

const LoginPage = () => {
  const { username, setUsername, email, setEmail, login } =
    useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email) {
      alert("Please enter both username and email.");
      return;
    }

    login();
    console.log("Logged in!");
  };
  return (
    <div>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default LoginPage;
