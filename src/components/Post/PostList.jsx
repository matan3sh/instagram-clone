import React from 'react';
import PostPreview from './PostPreview';

import '../../style/Post.css';

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.map(({ id, post }) => (
        <PostPreview post={post} key={id} />
      ))}{' '}
    </div>
  );
};

export default PostList;
