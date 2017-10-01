import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import moment from 'moment'

import { fetchCategories } from '../actions/categories.js'
import { fetchPosts } from '../actions/posts.js'

class CommentsList extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  render() {
		//const { comments } = this.props
    let comments = [];

    return (
			<section className="section">
	    	<div className="container">
					{comments.map((comment, key) => (
						<div key={key} className="box">
						  <article className="media">
						    <div className="media-left">
						      {comment.voteScore}
						    </div>
						    <div className="media-content">
						      <div className="content">
                    <Link key={key} to={"post/" + comment.id}>
  						        <p>
  											<span>{comment.title}</span> <small className="has-text-grey-light">by {comment.author}</small>
  						        </p>
                    </Link>
						      </div>
						    </div>
								<div className="media-right">
						       <small className="has-text-grey-light">{moment(comment.timestamp).fromNow()}</small>
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
)(CommentsList)
