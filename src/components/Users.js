import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "../styles.css";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/users")
      .then((el) => setUsers(el.data))
      .then(setIsLoading(false));
  }, []);

  return (
    <div>
      <h1>Users {users.length ? "- (" + users.length + ")" : ""}</h1>
      <ul className="usersGrid">
        {isLoading && <h3>Loading...</h3>}
        {isLoading === false &&
          users.map((user) => (
            <Link to={"/user/" + user.id} key={user.id}>
              {user.name.toUpperCase()}
            </Link>
          ))}
      </ul>
    </div>
  );
}
