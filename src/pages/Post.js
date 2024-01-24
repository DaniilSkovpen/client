// Individual Pages Based on ID
// using { useParams } hook
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Helpers/AuthContext";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert("Your not logged in");
        }
        const commentToAdd = {
          commentBody: newComment,
          username: response.data.username,
        };
        setComments([...comments, commentToAdd]);
        setNewComment("");
      });
  };

  function deleteComment(Id) {
    axios
      .delete(`http://localhost:3001/comments/${Id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id !== Id;
          })
        );
      });
  }

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            autoComplete="off"
            placeholder="Comment..."
            onChange={(event) => setNewComment(event.target.value)}
            value={newComment}
          ></input>
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <label> User: {comment.username}</label>
                {authState.username === comment.username && (
                  <label
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    {" "}
                    X
                  </label>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
