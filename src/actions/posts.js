import * as PostsAPI from '../utils/PostsAPI';

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY'

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const fetchPosts = () => dispatch => (
  PostsAPI
      .fetchPosts()
      .then(posts => dispatch(receivePosts(posts)))
);
