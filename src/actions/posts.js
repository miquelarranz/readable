import * as PostsAPI from '../utils/PostsAPI';

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const EDIT_UPDATED_POST = 'EDIT_UPDATED_POST'
export const RECEIVE_POST = 'RECEIVE_POST'
export const REMOVE_POST = 'REMOVE_POST'

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const fetchPosts = () => dispatch => (
  PostsAPI
      .fetchPosts()
      .then(posts => dispatch(receivePosts(posts)))
);

export const fetchPostsByCategory = (category) => dispatch => (
  PostsAPI
      .fetchPostsByCategory(category)
      .then(posts => dispatch(receivePosts(posts)))
);

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

export const fetchPost = (postId) => dispatch => (
  PostsAPI
      .fetchPost(postId)
      .then(post => dispatch(receivePost(post)))
);

export const createPost = (post) => dispatch => (
  PostsAPI
      .createPost(post)
      .then(post => dispatch(receivePost(post)))
);

export const editUpdatedPost = post => ({
  type: EDIT_UPDATED_POST,
  post
});

export const updatePost = (post) => dispatch => (
  PostsAPI
      .updatePost(post)
      .then(post => dispatch(editUpdatedPost(post)))
);

export const removePost = post => ({
  type: REMOVE_POST,
  post
});

export const deletePost = (postId) => dispatch => (
  PostsAPI
      .deletePost(postId)
      .then(post => dispatch(removePost(post)))
);

export const votePost = (postId, option) => dispatch => (
  PostsAPI
      .votePost(postId, option)
      .then(post => dispatch(editUpdatedPost(post)))
);
