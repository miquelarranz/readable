import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom';
import { fetchCategories } from '../actions/categories.js'
import '../styles/DefaultCategoryViews.css';

class CategoryView extends Component {

  componentDidMount() {
    const { fetchCategories } = this.props

    fetchCategories();
  }

  render() {
		const { categories } = this.props
    const separator = "|"

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
			</div>
    );
  }
}

function mapStateToProps ({ categories }) {
  return {
    categories: [{name:"All", path:"/"}].concat(categories)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: (data) => dispatch(fetchCategories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryView)
