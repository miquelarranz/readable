import {
  RECEIVE_POSTS,
  RECEIVE_POSTS_BY_CATEGORY,
  ADD_CREATED_POST,
  RECEIVE_POST,
  REMOVE_POST,
  EDIT_UPDATED_POST
} from '../actions/posts'

export default function categories (state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS :
      return action.posts

    case RECEIVE_POSTS_BY_CATEGORY:
      return action.posts

    case ADD_CREATED_POST:
      return [
        ...state,
        action.post
      ]

    case RECEIVE_POST:
      return [
        ...state,
        action.post
      ]

    case REMOVE_POST:
      return state.filter((post) => post.id !== action.post.id)

    case EDIT_UPDATED_POST:
      return state.map((post, index) => {
        if(post.id !== action.post.id) return post;
        return {
            ...post,
            ...action.post
        };
      });

    default :
      return state
  }
}
