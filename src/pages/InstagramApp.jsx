import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadPosts } from '../store/Post/actions';

import PostList from '../components/Post/PostList';
import PostUpload from '../components/Post/PostUpload';

const InstagramApp = ({ posts, loadPosts, user }) => {
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <div>
      {user?.displayName ? (
        <PostUpload />
      ) : (
        <h3 className='postupload-sorry'>
          Sorry you need to login to upload and comment
        </h3>
      )}
      <PostList posts={posts} loggedInUsername={user?.displayName} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  user: state.auth.user
});

const mapDispatchToProps = {
  loadPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(InstagramApp);
