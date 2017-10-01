import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import _ from 'lodash'
import ReactModal from 'react-modal'
import moment from 'moment'

import { fetchPost, deletePost } from '../actions/posts.js'

import CreatePostModal from '../components/CreatePostModal'
import CommentsList from '../components/CommentsList'

import '../styles/PostView.css';

class PostView extends Component {
	state = {
		editPostModalOpened: false,
		redirectOnDelete: false
	}

  componentDidMount() {
    const { fetchPost, match } = this.props

    if (match.params.postId) fetchPost(match.params.postId)
  }

	componentWillReceiveProps(nextProps) {
		const { fetchPost, match } = this.props

		if (nextProps.match.params.postId !== match.params.postId) {
			if (nextProps.match.params.postId) fetchPost(nextProps.match.params.postId)
		}
	}

	openEditPostModal = () => this.setState(() => ({ editPostModalOpened: true }))

  closeEditPostModal = () => this.setState(() => ({ editPostModalOpened: false }))

	deletePost = () => {
		const { deletePost, match } = this.props

		deletePost(match.params.postId)
		this.setState(() => ({ redirectOnDelete: true }))
	}

  render() {
		const { posts, match } = this.props
		const { editPostModalOpened, redirectOnDelete } = this.state

		let post = posts.filter((post) => post.id === match.params.postId)
		if (post.length > 0) post = post[0]

    return (
			<div>
				{(redirectOnDelete || post.delete) &&
					<Redirect to='/'/>
				}

				<section className="hero is-primary">
					<div className="hero-body">
						<div className="container">
							<h1 className="is-size-3">
								{post.title}
							</h1>
						</div>
					</div>
				</section>

				<section className="section">
		    	<div className="container">
						<article className="media">
							<div className="media-left">
								<small className="has-text-primary">{post.voteScore}</small>
							</div>
							<div className="media-content"></div>
							<div className="media-right">
								<a className="button is-small is-success" onClick={() => this.openEditPostModal()}>Edit</a>
								<a className="button is-small is-link" onClick={() => this.deletePost()}>Delete</a>
							</div>
						</article>

						<p className="post-view-post-content">
							{post.body}
						</p>

						<article className="media">
						  <div className="media-left">
					      <small className="has-text-grey-light">by {post.author}</small>
						  </div>
						  <div className="media-content"></div>
							<div className="media-right">
								<small className="has-text-grey-light">{moment(post.timestamp).format('DD/MM/YYYY HH:mm:ss')}</small>
							</div>
						</article>

						<hr></hr>

						<CreatePostModal status={editPostModalOpened} closeCreatePostModal={this.closeEditPostModal} data={post} mode="edit"></CreatePostModal>

					</div>
				</section>
			</div>
    );
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts: posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPost: (postId) => dispatch(fetchPost(postId)),
    deletePost: (postId) => dispatch(deletePost(postId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView)
