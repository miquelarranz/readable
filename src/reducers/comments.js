import {
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
  REMOVE_COMMENT,
  EDIT_UPDATED_COMMENT
} from '../actions/comments'

export default function comments (state = [], action) {
  switch (action.type) {
    case RECEIVE_COMMENTS :
      return action.comments

    case RECEIVE_COMMENT:
      return [
        ...state,
        action.comment
      ]

    case REMOVE_COMMENT:
      return state.filter((comment) => comment.id !== action.comment.id)

    case EDIT_UPDATED_COMMENT:
      return state.map((comment, index) => {
        if(comment.id !== action.comment.id) return comment;
        return {
            ...comment,
            ...action.comment
        };
      });

    default :
      return state
  }
}
