import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import './Post.css'

function Post({postid,user,username,caption,imageUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    const postComment = (e) => {
        e.preventDefault();
  
        db.collection("posts").doc(postid).collection("comments").add({
          text: comment,
          username: user.displayName,
        });
        setComment("");
      };

    useEffect(() => {
        let unsubscribe;
        if (postid) {
          unsubscribe = db
            .collection("posts")
            .doc(postid)
            .collection("comments")
            .onSnapshot((snapshot) => {
              setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
  
        return () => {
          unsubscribe();
        };
      }, [postid]);
    return (
        <div className="post">
            <div className='post__header'>
            <Avatar className="post__avatar"
            alt={username}
            src="./avtar.jpg" />
            <h3>{username}</h3>
            </div>
           
            <img className="post__image" src={imageUrl} alt="" />
            <h4 className="post__text"><strong>{username} : </strong>{caption}</h4>

            
        <div className="post__comments">
          {comments.map((comment) => (
            <p>
              <b>{comment.username}</b> {comment.text}
            </p>
          ))}
        </div>

        {user && (
          <form className="post__commentBox">
            <input
              className="post__input"
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              disabled={!comment}
              className="post__button"
              type="submit"
              onClick={postComment}
            >
              Post
            </button>
          </form>
        )}
        </div>
    )
}

export default Post
