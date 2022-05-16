import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function User() {
  const userId = useParams();
  const [user, setUser] = useState([]);
  const [userTodo, setUserTodo] = useState([]);
  const [loading, setLoading] = useState(true);

  //Kullanıcı özellikleri
  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/users/${userId.id}`)
      .then((el) => setUser(el.data))
      .then(setLoading(false));
  }, []);

  //Todolist
  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/users/${userId.id}/todos`);
  }, []);

  return (
    <div className="container">
      {loading && <h1>Loading...</h1>}
      {!loading && (
        <div className="user">
          <h1>
            {user.name}{" "}
            <sup
              style={{
                fontSize: 16 + "px",
                backgroundColor: "white",
                color: "black",
                padding: 5 + "px",
                borderRadius: 5 + "px"
              }}
            >
              {" "}
              ID : {user.id}
            </sup>
          </h1>
          <p>
            <span>Username</span> <span>{user.username}</span>
          </p>
          <p>
            <span>E-mail</span> <span>{user.email}</span>
          </p>
          <p>
            <span>Phone</span> <span>{user.phone}</span>
          </p>
          <p>
            <span>Website</span> <span>{user.website}</span>
          </p>
        </div>
      )}
      <div>
        <h1>Todo</h1>
      </div>

      <button className="button" title={"Posts of " + user.name}>
        Posts
      </button>
      <button className="button" title={"Comments of " + user.name}>
        Comments
      </button>
      <button className="button" title={"Albums of " + user.name}>
        Albums
      </button>
      <Link to="/users">
        <button className="button" title="Go Back to Users">
          Go Back
        </button>
      </Link>
    </div>
  );
}
