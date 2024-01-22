import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const data = { username: username, password: password };
  const login = () => {
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else sessionStorage.setItem("accessToken", response.data);
      navigate("/");
    });
  };

  return (
    <div>
      <input
        type="text"
        onChange={(event) => setUsername(event.target.value)}
      ></input>
      <input
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      ></input>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
