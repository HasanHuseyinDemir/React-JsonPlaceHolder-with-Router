import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [com, loadCom] = useState(false);
  const postId = useParams();

  //Post içeriği
  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/posts/${postId.id}`)
      .then((el) => setPost(el.data))
      .then(setLoading(false));
  }, []);

  //post yorumları
  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/posts/${postId.id}/comments`)
      .then((el) => setComments(el.data))
      .then(loadCom(true));
  }, []);

  return (
    <>
      <h1>Post</h1>
      {loading && <h1>Loading</h1>}
      {loading === false && (
        <div className="post">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      )}
      <hr />
      <h3>Comments ({comments.length})</h3>
      <div className="comments">
        {com &&
          comments.map((el) => (
            <div key={el.id}>
              <div className="comment">
                <span style={{ fontSize: 14 + "px", fontWeight: 200 }}>
                  {" "}
                  {el.email}
                </span>
                <hr />
                <span> {el.name} </span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
