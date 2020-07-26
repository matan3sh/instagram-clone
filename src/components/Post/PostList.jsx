import React from 'react';
import PostPreview from './PostPreview';

import '../../style/Post.css';

const PostList = ({ posts, loggedInUsername }) => {
  return (
    <div>
      {posts.map(({ id, post }) => (
        <PostPreview
          post={post}
          key={id}
          id={id}
          loggedInUsername={loggedInUsername}
        />
      ))}{' '}
    </div>
  );
};

export default PostList;
