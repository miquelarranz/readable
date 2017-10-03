import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { voteComment } from '../actions/comments.js'

import '../styles/Voter.css'

class CommentVoter extends Component {

  render() {
    const { voteScore, commentId, voteComment } = this.props

    return (
      <div>
        <small className="has-text-grey is-size-7">
          <a onClick={() => voteComment(commentId, 'downVote')}><i className="fa fa-chevron-down"></i></a>
          <span className="voter-score">{voteScore} </span>
          <a onClick={() => voteComment(commentId, 'upVote')}><i className="fa fa-chevron-up"></i></a>
        </small>
      </div>
    );
  }
}

function mapStateToProps () {
  return {

  }
}

function mapDispatchToProps (dispatch) {
  return {
    voteComment: (commentId, option) => dispatch(voteComment(commentId, option))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentVoter)
