import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { votePost } from '../actions/posts.js'

import '../styles/Voter.css'

class PostVoter extends Component {
  static propTypes = {
    voteScore: PropTypes.number,
    postId: PropTypes.string
  }

  render() {
    const { voteScore, postId, votePost } = this.props

    return (
      <div>
        <small className="has-text-grey is-size-7">
          <a onClick={() => votePost(postId, 'downVote')}><i className="fa fa-chevron-down"></i></a>
          <span className="voter-score">{voteScore} </span>
          <a onClick={() => votePost(postId, 'upVote')}><i className="fa fa-chevron-up"></i></a>
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
    votePost: (postId, option) => dispatch(votePost(postId, option))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostVoter)
