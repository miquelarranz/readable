import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom';
import { fetchCategories } from '../actions/categories.js'
import { fetchPosts, fetchPostsByCategory } from '../actions/posts.js'
import '../styles/DefaultCategoryViews.css';
import PostsList from '../components/PostsList'
import _ from 'lodash'

class DefaultView extends Component {
	state = {
		filter: 'voteScore'
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
			if (match.params.category) fetchPostsByCategory(match.params.category)
			else fetchPosts()
		}
	}

	changeFilter(filter) {
		this.setState({ filter })
	}

  render() {
		const { categories, posts, match } = this.props
		const { filter } = this.state

		let orderedPosts = _.reverse(_.sortBy(posts, filter))

    return (
			<div>
				<section className="hero is-primary">
	        <div className="hero-body">
	          <div className="container">
							{categories.map((category, key) => (
								<span key={key}>
									<Link className={"default-category-views-category " + (((match.params.category == category.path) || (!match.params.category && category.path == "/")) ? "default-category-views-category-active" : "")} to={category.path}>{category.name}</Link>
									<span>|</span>
								</span>
							))}
	          </div>
	        </div>
	      </section>

				<section className="section default-category-views-filter">
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
								<button className="button is-success">
									<i className="fa fa-plus default-category-views-add-post-icon"></i>
									<b>Add Post</b>
								</button>
							</div>
						</article>
					</div>
				</section>

				<PostsList posts={orderedPosts}></PostsList>
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
