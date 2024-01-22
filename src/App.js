import "./App.css";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="navbar">
          <NavLink to="/createPost">Create a post</NavLink>
          <NavLink to="/">Home Page</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/registration">Sign in</NavLink>
        </div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/createPost" exact element={<CreatePost />} />
          <Route path="/post/:id" exact element={<Post />} />
          <Route path="/registration" exact element={<Registration />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
