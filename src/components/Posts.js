import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/posts")
      .then((el) => setPosts(el.data))
      .then(setLoaded(true));
  }, []);

  return (
    <>
      <h1>All Posts ({posts.length})</h1>
      {loaded === false && <h1>...Loading...</h1>}
      <ul
        style={{
          display: "grid",
          padding: 2 + "%",
          gridTemplateColumns: "auto auto auto auto",
          gap: 5 + "px"
        }}
      >
        {loaded &&
          posts.map((post) => (
            <li
              style={{
                backgroundColor: "white",
                margin: 5 + "px",
                textAlign: "left",
                border: "solid",
                padding: 5 + "px"
              }}
              key={post.id}
            >
              <h3 align="center">{post.title.toUpperCase().slice(0, 20)}..</h3>
              <hr />
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  flexDirection: "column",
                  fontWeight: 300
                }}
              >
                {post.body.slice(0, 100)}...
                <Link to={`/post/${post.id}`}>Show More</Link>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
