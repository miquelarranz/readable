import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'

import { fetchCategories } from '../actions/categories.js'
import { createPost, updatePost } from '../actions/posts.js'

import '../styles/PostModal.css'

class PostModal extends Component {
  static propTypes = {
    closePostModal: PropTypes.func.isRequired,
    status: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
    data: PropTypes.object
  }

  state = {
    showError: false
  }

  componentDidMount() {
    const { categories, fetchCategories } = this.props

    if (categories.length === 0) fetchCategories()
  }

  handleSubmit = (e) => {
		e.preventDefault()

    const { createPost, updatePost, closePostModal, mode, data } = this.props
    const values = serializeForm(e.target, { hash: true })

    if ((mode === 'add' && values.category !== 'none' && values.title && values.body && values.author) || (mode === 'edit' && values.title && values.body)) {
      if (mode === 'add') {
        values.id = uuidv4()
        values.timestamp = Date.now()

        createPost(values)
      }
      else if (mode === 'edit') {
        values.id = data.id
        updatePost(values)
      }

      closePostModal()
    }
    else {
      this.setState(() => ({ showError: true }))
    }
	}

  render() {
		const { status, closePostModal, categories, data, mode } = this.props
		const { showError } = this.state

    let selectValue = 'none'
    if (data && data.category) selectValue = data.category;

    return (
      <ReactModal
          overlayClassName='overlay'
          isOpen={status}
          onRequestClose={closePostModal}
          contentLabel='Modal'
        >
          <div className="create-post-modal-content">
            <h1 className="title">
              {mode === 'edit' && "Edit Post"}
              {mode === 'add' && "Create Post"}
            </h1>

            <form onSubmit={this.handleSubmit}>

              {showError && (
                <div className="notification is-danger">
                  You must fill up all the fields!
                </div>
              )}

              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input name="title" className="input" defaultValue={data && data.title} type="text" placeholder="How to create a react app"></input>
                </div>
              </div>

              <div className="field">
                <label className="label">Content</label>
                <div className="control">
                  <textarea name="body" className="textarea" defaultValue={data && data.body} type="text" placeholder="The first thing you need to do is..."></textarea>
                </div>
              </div>

              {mode === 'add' &&
                <div className="field">
                  <label className="label">Author</label>
                  <div className="control">
                    <input name="author" className="input" defaultValue={data && data.author} type="text" placeholder="John Doe"></input>
                  </div>
                </div>
              }

              {mode === 'add' &&
                <div className="field">
                  <label className="label">Category</label>
                  <div className="control">
                    <div className="select">
                      <select name="category" defaultValue={selectValue}>
                        <option value="none">Select a category</option>
                        {categories.map((category, key) => (
                          <option key={key} value={category.path}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              }

              <div className="field is-grouped">
                <div className="control">
                  <button onClick={() => closePostModal()} type="button" className="button is-link">Cancel</button>
                </div>
                <div className="control">
                  <button type="submit" className="button is-primary">
                    {mode === 'edit' && "Edit Post"}
                    {mode === 'add' && "Create Post"}
                  </button>
                </div>
              </div>
            </form>
          </div>
      </ReactModal>
    );
  }
}

function mapStateToProps ({ categories }) {
  return {
    categories: categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createPost: (post) => dispatch(createPost(post)),
    updatePost: (post) => dispatch(updatePost(post)),
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostModal)
