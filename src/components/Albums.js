import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Albums() {
  const [load, setLoad] = useState(false);

  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/albums")
      .then((el) => setAlbums(el.data))
      .then(setLoad(true));
  }, []);
  return (
    <>
      <h1>Albums</h1>
      <div className="album">
        {load === false && <h2>Loading...</h2>}
        {load &&
          albums.map((album) => (
            <div key={album.id}>
              <Link to={`/albums/${album.id}`}>{album.title}</Link>
            </div>
          ))}
      </div>
    </>
  );
}
