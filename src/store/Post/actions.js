import { db } from '../../config/firebase';

export const loadPosts = () => async (dispatch) => {
  try {
    db.collection('posts').onSnapshot((snapshot) => {
      let posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        post: doc.data()
      }));
      dispatch({ type: 'LOAD_POSTS', payload: posts });
    });
  } catch (err) {
    console.log(err);
  }
};
