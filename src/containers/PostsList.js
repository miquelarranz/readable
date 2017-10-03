import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import moment from 'moment'

import { deletePost } from '../actions/posts.js'

import PostVoter from '../containers/PostVoter'
import CreatePostModal from '../containers/CreatePostModal'

class PostsList extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  state = {
    editPostModalOpened: false,
    selectedPost: {}
  }

  openEditPostModal = (post) => this.setState(() => ({ editPostModalOpened: true, selectedPost: post }))

  closeEditPostModal = () => this.setState(() => ({ editPostModalOpened: false }))

  deletePost = (postId) => {
		const { deletePost } = this.props

		deletePost(postId)
	}

  render() {
		const { posts } = this.props
		const { selectedPost, editPostModalOpened } = this.state

    var post

    return (
			<section className="section">
	    	<div className="container">
					{posts.map((post, key) => (
						<div key={key} className="box">
						  <article className="media">
						    <div className="media-left">
						      <PostVoter voteScore={post.voteScore} postId={post.id}></PostVoter>
						    </div>
						    <div className="media-content">
						      <div className="content">
                    <Link key={key} to={post.category + "/" + post.id}>
  						        <p>
  											<span>{post.title}</span> <small className="has-text-grey-light">by {post.author}</small>
  						        </p>
                    </Link>
						      </div>
						    </div>
								<div className="media-right">
						       <small className="has-text-grey-light"><a onClick={() => this.openEditPostModal(post)}>Edit</a> · <a onClick={() => this.deletePost(post.id)}>Delete</a> · {moment(post.timestamp).fromNow()}</small>
						    </div>
						  </article>
						</div>
					))}

          <CreatePostModal status={editPostModalOpened} closeCreatePostModal={this.closeEditPostModal} data={selectedPost} mode="edit"></CreatePostModal>

				</div>
			</section>
    );
  }
}

function mapStateToProps () {
  return {

  }
}

function mapDispatchToProps (dispatch) {
  return {
    deletePost: (postId) => dispatch(deletePost(postId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)
