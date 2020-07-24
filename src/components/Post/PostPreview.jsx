import React from 'react';
import Avatar from '@material-ui/core/Avatar';

function PostPreview({ post }) {
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
    </div>
  );
}

export default PostPreview;
