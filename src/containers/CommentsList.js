import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'

import CommentVoter from '../containers/CommentVoter'
import CommentModal from '../containers/CommentModal'

import { fetchComments, deleteComment } from '../actions/comments.js'

class CommentsList extends Component {
  static propTypes = {
    postId: PropTypes.string,
  }

  state = {
    editCommentModalOpened: false,
    createCommentModalOpened: false,
    selectedComment: {},
    filter: 'voteScore'
  }

  componentDidMount() {
    const { postId, fetchComments } = this.props

    fetchComments(postId)
  }

  componentWillReceiveProps(nextProps) {
    const { postId, fetchComments } = this.props

    if (nextProps.postId !== postId) {
      if (nextProps.postId) fetchComments(nextProps.postId)
    }
  }

  openEditCommentModal = (comment) => this.setState(() => ({ editCommentModalOpened: true, selectedComment: comment }))

  closeEditCommentModal = () => this.setState(() => ({ editCommentModalOpened: false }))

  openCreateCommentModal = () => this.setState(() => ({ createCommentModalOpened: true }))

  closeCreateCommentModal = () => this.setState(() => ({ createCommentModalOpened: false }))

  deleteComment = (commentId) => {
		const { deleteComment } = this.props

		deleteComment(commentId)
	}

  changeFilter(filter) {
    this.setState({ filter })
  }

  render() {
		const { comments, postId } = this.props
		const { editCommentModalOpened, filter, selectedComment, createCommentModalOpened } = this.state

    let orderedComments = _.reverse(_.sortBy(comments, filter))

    return (
      <div>
        <article className="media">
          <div className="media-left">
            <span>
              <a onClick={() => this.changeFilter('voteScore')} className={"tag " + (filter === "voteScore" ? "is-primary" : "is-light")}>Filter by vote score</a>
              <a onClick={() => this.changeFilter('timestamp')} className={"tag " + (filter === "timestamp" ? "is-primary" : "is-light")}>Filter by timestamp</a>
            </span>
          </div>
          <div className="media-content">
            <small><i className="fa fa-comments has-text-primary" aria-hidden="true"></i> {comments.length}</small>
          </div>
          <div className="media-right">
            <button onClick={() => this.openCreateCommentModal()} className="button is-small is-success">
              <i className="fa fa-plus"></i> <b>Add Comment</b>
            </button>
          </div>
        </article>

				{orderedComments.map((comment, key) => (
          <article key={key} className="media">
            <div className="media-left">
              <CommentVoter voteScore={comment.voteScore} commentId={comment.id}></CommentVoter>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{comment.author}</strong>
                  <br></br>
                  {comment.body}
                  <br></br>
                  <small><a onClick={() => this.openEditCommentModal(comment)}>Edit</a> · <a onClick={() => this.deleteComment(comment.id)}>Delete</a> · {moment(comment.timestamp).fromNow()}</small>
                </p>
              </div>
            </div>
            <div className="media-right">

            </div>
          </article>
				))}

        <CommentModal status={editCommentModalOpened} closeCommentModal={this.closeEditCommentModal} data={selectedComment} mode="edit"></CommentModal>

        <CommentModal status={createCommentModalOpened} closeCommentModal={this.closeCreateCommentModal} mode="add" postId={postId}></CommentModal>
			</div>
    );
  }
}

function mapStateToProps ({ comments }) {
  return {
    comments: comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    fetchComments: (postId) => dispatch(fetchComments(postId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsList)
