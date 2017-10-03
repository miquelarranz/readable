import * as CommentsAPI from '../utils/CommentsAPI';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const EDIT_UPDATED_COMMENT = 'EDIT_UPDATED_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

export const fetchComments = (postId) => dispatch => (
  CommentsAPI
      .fetchComments(postId)
      .then(comments => dispatch(receiveComments(comments)))
);

export const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
});

export const createComment = (comment) => dispatch => (
  CommentsAPI
      .createComment(comment)
      .then(comment => dispatch(receiveComment(comment)))
);

export const editUpdatedComment = comment => ({
  type: EDIT_UPDATED_COMMENT,
  comment
});

export const updateComment = (comment) => dispatch => (
  CommentsAPI
      .updateComment(comment)
      .then(comment => dispatch(editUpdatedComment(comment)))
);

export const removeComment = comment => ({
  type: REMOVE_COMMENT,
  comment
});

export const deleteComment = (commentId) => dispatch => (
  CommentsAPI
      .deleteComment(commentId)
      .then(comment => dispatch(removeComment(comment)))
);

export const voteComment = (commentId, option) => dispatch => (
  CommentsAPI
      .voteComment(commentId, option)
      .then(comment => dispatch(editUpdatedComment(comment)))
);
