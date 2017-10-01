import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

//import { createPost } from '../actions/posts.js'

import '../styles/CreatePostModal.css'

class Voter extends Component {
  
  render() {
    return (
      <div>

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
    //createPost: (post) => dispatch(createPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePostModal)
