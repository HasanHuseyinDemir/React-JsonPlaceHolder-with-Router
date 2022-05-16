import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const page = useParams();
  const [pages, setPages] = useState(0);
  const per = 20;

  //Sayfa Numarasına Erişim
  //Eğer sayfa numarası belirtilmedi ise
  useEffect(() => {
    if (!page.page) {
      setPages(0);
    } else {
      setPages(page.page);
    }
  }, [page]);

  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/photos").then((el) =>
      setPhotos(el.data)
    );
  }, []);

  useEffect(() => {
    if (pages * 20 >= photos.length || pages < 0) {
      setPages(0);
    }
  }, [pages]);

  return (
    <>
      <h1 className="photosNav">
        Photos
        <span
          style={{
            fontSize: 7
          }}
        >
          {parseInt(pages * per + 20, 10) + "/" + photos.length}
        </span>{" "}
        <br />
        <Link to={"/photos/" + (parseInt(pages, 10) - 1)}>-</Link>
        {pages}
        <Link to={"/photos/" + (parseInt(pages, 10) + 1)}>+</Link>
      </h1>
      <div className="photos">
        {photos &&
          photos
            .slice(parseInt(pages * per, 10), parseInt(pages * per + 20, 10))
            .map((photo) => (
              <div className="photo" key={photo.id}>
                <a href={photo.url}>
                  <img src={photo.thumbnailUrl} alt="Press to enlarge" />
                </a>
                <p>{photo.title}</p>
              </div>
            ))}
      </div>
    </>
  );
}
