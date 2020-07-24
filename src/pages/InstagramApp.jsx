import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadPosts } from '../store/Post/actions';

import PostList from '../components/Post/PostList';

const InstagramApp = ({ posts, loadPosts }) => {
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.post.posts
});

const mapDispatchToProps = {
  loadPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(InstagramApp);
