import { Children, useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Link, useParams } from "react-router-dom";

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const page = useParams();
  const [pages, setPages] = useState(1);
  const [per, setPer] = useState(20);

  //Sayfa Numarasına Erişim
  //Eğer sayfa numarası belirtilmedi ise
  useEffect(() => {
    if (!page.page) {
      setPages(1);
    } else {
      setPages(page.page);
    }
    console.log(parseInt(pages * per));
  }, [page]);

  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/photos").then((el) =>
      setPhotos(el.data)
    );
  }, []);
  return (
    <>
      <h1 className="photosNav">
        Photos <br />
        <Link to={"/photos/" + (parseInt(pages) - 1)}>-</Link>
        {pages}
        <Link to={"/photos/" + (parseInt(pages) + 1)}>+</Link>
      </h1>
      <div className="photos">
        {photos &&
          photos
            .slice(parseInt(pages * per), parseInt(pages * per + 20))
            .map((photo) => (
              <div className="photo">
                <img src={photo.thumbnailUrl} />
                <p>{photo.title}</p>
              </div>
            ))}
        {20 * pages}/{photos.length}
      </div>
    </>
  );
}
