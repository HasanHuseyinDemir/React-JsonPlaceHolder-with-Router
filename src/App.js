import "./styles.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import axios from "axios";
import { useState, useEffect } from "react";
import Posts from "./components/Posts";
import Post from "./components/Post";
import Albums from "./components/Albums";
import Photos from "./components/Photos";
import Todos from "./components/Todos";
import NotFound from "./components/NotFound";
import Album from "./components/Album";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [todos, setTodos] = useState([]);

  //Posts Sayısı
  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/posts").then((el) =>
      setPosts(el.data.length)
    );
  }, []);

  //Users Sayısı
  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/users").then((el) =>
      setUsers(el.data.length)
    );
  }, []);

  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/albums").then((el) =>
      setAlbums(el.data.length)
    );
  }, []);
  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/photos").then((el) =>
      setPhotos(el.data.length)
    );
  }, []);
  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/todos").then((el) =>
      setTodos(el.data.length)
    );
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/users">Users {users && "(" + users + ")"}</Link>
          <Link to="/posts">Posts {posts && "(" + posts + ")"}</Link>
          <Link to="/albums">Albums {albums && "(" + albums + ")"}</Link>
          <Link to="/photos">Photos {photos && "(" + photos + ")"}</Link>
        </div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/albums/:id" element={<Album />} />
          <Route path="/photos/" element={<Photos />} />
          <Route path="/photos/:page" element={<Photos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Sayfama Hoşgeldiniz.</p>
    </div>
  );
}
