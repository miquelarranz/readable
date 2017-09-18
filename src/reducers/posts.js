import {
  RECEIVE_POSTS,
  RECEIVE_POSTS_BY_CATEGORY
} from '../actions/posts'

export default function categories (state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS :
      return action.posts
    case RECEIVE_POSTS_BY_CATEGORY:
      return action.posts
    default :
      return state
  }
}
