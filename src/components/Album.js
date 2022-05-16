import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Album() {
  const getID = useParams();
  const [album, setAlbum] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    axios(
      `https://jsonplaceholder.typicode.com/albums/${getID.id}`
    ).then((el) => setTitle(el.data.title));
  }, []);

  //Albume ait fotograflar
  useEffect(() => {
    axios(
      `https://jsonplaceholder.typicode.com/albums/${getID.id}/photos`
    ).then((el) => setAlbum(el.data));
  }, []);
  return (
    <>
      <h1>
        {getID.id}.Album - ({album && album.length}){" "}
      </h1>
      <h2>{title ? <p>{title}</p> : ""}</h2>
      <div className="photos">
        {album &&
          album.map((photo) => (
            <div className="photo" key={photo.id}>
              <a href={photo.url}>
                <img src={photo.thumbnailUrl} />
              </a>
              <p>{photo.title}</p>
            </div>
          ))}
      </div>
    </>
  );
}
