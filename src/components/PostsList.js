import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom';
import { fetchCategories } from '../actions/categories.js'
import { fetchPosts } from '../actions/posts.js'
import '../styles/DefaultCategoryViews.css';
import moment from 'moment'

class PostsList extends Component {

  render() {
		const { posts } = this.props

    return (
			<section className="section">
	    	<div className="container">
					{posts.map((post, key) => (
						<div key={key} className="box">
						  <article className="media">
						    <div className="media-left">
						      {post.voteScore}
						    </div>
						    <div className="media-content">
						      <div className="content">
						        <p>
											<span>{post.title}</span> <small className="has-text-grey-light">by {post.author}</small>
						        </p>
						      </div>
						    </div>
								<div className="media-right">
						       <small className="has-text-grey-light">{moment(post.timestamp).fromNow()}</small>
						    </div>
						  </article>
						</div>
					))}
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
    fetchCategories: (data) => dispatch(fetchCategories()),
    fetchPosts: (data) => dispatch(fetchPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)
