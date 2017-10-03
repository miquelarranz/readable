import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import moment from 'moment'

import CommentVoter from '../containers/CommentVoter'

import { fetchComments } from '../actions/comments.js'

class CommentsList extends Component {

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

  render() {
		const { comments } = this.props

    return (
      <div>
				{comments.map((comment, key) => (
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
                  <small><a>Edit</a> · <a>Delete</a> · {moment(comment.timestamp).fromNow()}</small>
                </p>
              </div>
            </div>
            <div className="media-right">

            </div>
          </article>
				))}
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
    fetchComments: (postId) => dispatch(fetchComments(postId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsList)
