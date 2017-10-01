import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import _ from 'lodash'

import { fetchCategories } from '../actions/categories.js'
import { fetchPosts, fetchPostsByCategory } from '../actions/posts.js'

import PostsList from '../components/PostsList'
import CreatePostModal from '../components/CreatePostModal'

import '../styles/DefaultView.css';

class DefaultView extends Component {
	state = {
		filter: 'voteScore',
		createPostModalOpened: false
	}

  componentDidMount() {
    const { fetchCategories, fetchPosts, fetchPostsByCategory, match } = this.props

    if (match.params.category) fetchPostsByCategory(match.params.category)
		else fetchPosts()

		fetchCategories()
  }

	componentWillReceiveProps(nextProps) {
		const { fetchPosts, fetchPostsByCategory, match } = this.props

		if (nextProps.match.params.category !== match.params.category) {
			if (nextProps.match.params.category) fetchPostsByCategory(nextProps.match.params.category)
			else fetchPosts()
		}
	}

	openCreatePostModal = () => this.setState(() => ({ createPostModalOpened: true }))

  closeCreatePostModal = () => this.setState(() => ({ createPostModalOpened: false }))

	changeFilter(filter) {
		this.setState({ filter })
	}

  render() {
		const { categories, posts, match } = this.props
		const { filter, createPostModalOpened } = this.state

		let availablePosts = posts.filter((post) => !post.delete)

		let orderedPosts = _.reverse(_.sortBy(availablePosts, filter))

    return (
			<div>
				<section className="hero is-primary">
	        <div className="hero-body">
	          <div className="container">
							{categories.map((category, key) => (
								<span key={key}>
									<Link className={"default-view-category " + (((match.params.category === category.path) || (!match.params.category && category.path === "/")) ? "default-view-category-active" : "")} to={category.path}>{category.name}</Link>
									<span>|</span>
								</span>
							))}
	          </div>
	        </div>
	      </section>

				<section className="section default-view-filter">
		    	<div className="container">
						<article className="media">
							<div className="media-left">
								<span>
									<a onClick={() => this.changeFilter('voteScore')} className={"tag " + (filter === "voteScore" ? "is-primary" : "is-light")}>Filter by vote score</a>
									<a onClick={() => this.changeFilter('timestamp')} className={"tag " + (filter === "timestamp" ? "is-primary" : "is-light")}>Filter by timestamp</a>
									<a onClick={() => this.changeFilter('name')} className={"tag " + (filter === "name" ? "is-primary" : "is-light")}>Filter by name</a>
								</span>
							</div>
							<div className="media-content">
							</div>
							<div className="media-right">
								<button onClick={() => this.openCreatePostModal()} className="button is-success">
									<i className="fa fa-plus default-view-add-post-icon"></i>
									<b>Add Post</b>
								</button>
							</div>
						</article>
					</div>
				</section>

				<PostsList posts={orderedPosts}></PostsList>

				<CreatePostModal status={createPostModalOpened} closeCreatePostModal={this.closeCreatePostModal} mode="add"></CreatePostModal>

			</div>
    );
  }
}

function mapStateToProps ({ categories, posts }) {
  return {
		categories: [{name:"All", path:"/"}].concat(categories),
    posts: posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts()),
    fetchPostsByCategory: (category) => dispatch(fetchPostsByCategory(category))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultView)
