import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom';
import { fetchCategories } from '../actions/categories.js'
import { fetchPosts } from '../actions/posts.js'
import '../styles/DefaultCategoryViews.css';

class DefaultView extends Component {

  componentDidMount() {
    const { fetchCategories, fetchPosts } = this.props

    fetchCategories();
    fetchPosts();
  }

  render() {
		const { categories, posts } = this.props

    return (
			<div>
				<section className="hero is-primary">
	        <div className="hero-body">
	          <div className="container">
							{categories.map((category, key) => (
								<span key={key}>
									<Link className="default-category-views-category" to={category.path}>{category.name}</Link>
									<span>|</span>
								</span>
							))}
	          </div>
	        </div>
	      </section>

				<section className="section">
		    	<div className="container">
						{posts.map((post, key) => (
							<span>{post.title}</span>
						))}
					</div>
				</section>
			</div>
    );
  }
}

function mapStateToProps ({ categories, posts }) {
  return {
    categories: categories,
    posts: posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: (data) => dispatch(fetchCategories()),
    fetchPosts: (data) => dispatch(fetchPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultView)
