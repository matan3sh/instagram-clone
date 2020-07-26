import React, { useEffect, useState } from 'react';

import { db } from '../../config/firebase';
import firebase from 'firebase';

import Avatar from '@material-ui/core/Avatar';

function PostPreview({ post, id, loggedInUsername }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if (id) {
      unsubscribe = db
        .collection('posts')
        .doc(id)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [id]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection('posts').doc(id).collection('comments').add({
      text: comment,
      username: loggedInUsername,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('');
  };

  return (
    <div className='post'>
      <div className='post__header'>
        <Avatar
          className='post__avatar'
          alt={post.username}
          src='/static/images/avatar/1.jpg'
        />
        <h3>{post.username}</h3>
      </div>
      <img src={post.imageUrl} alt='' className='post__image' />
      <h4 className='post__text'>
        <strong>{post.username}</strong> {post.caption}
      </h4>

      <div className='post__comments'>
        {comments.map((comment, index) => (
          <p key={index}>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      {loggedInUsername && (
        <form className='post__commentBox'>
          <input
            type='text'
            className='post__input'
            placeholder='Add Comment ...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            disabled={!comment}
            className='post__button'
            type='submit'
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default PostPreview;
