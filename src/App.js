import "./App.css";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from "./Helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/check", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <div className="navbar">
            <NavLink to="/createPost">Create a post</NavLink>
            <NavLink to="/">Home Page</NavLink>
            {!authState.status ? (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/registration">Sign in</NavLink>
              </>
            ) : (
              <button onClick={logout}>Log out</button>
            )}
            <h2>{authState.username}</h2>
          </div>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/createPost" exact element={<CreatePost />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/registration" exact element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
