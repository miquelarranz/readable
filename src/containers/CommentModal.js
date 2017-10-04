import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'

import { createComment, updateComment } from '../actions/comments.js'

import '../styles/CommentModal.css'

class CommentModal extends Component {
  static propTypes = {
    closeCommentModal: PropTypes.func.isRequired,
    status: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
    data: PropTypes.object
  }

  state = {
    showError: false
  }

  handleSubmit = (e) => {
		e.preventDefault()

    const { createComment, updateComment, closeCommentModal, mode, data, postId } = this.props
    const values = serializeForm(e.target, { hash: true })

    if ((mode === 'add' && values.body && values.author) || (mode === 'edit' && values.body)) {
      if (mode === 'add') {
        values.id = uuidv4()
        values.timestamp = Date.now()
        values.parentId = postId

        createComment(values)
      }
      else if (mode === 'edit') {
        values.id = data.id
        values.timestamp = Date.now()
        updateComment(values)
      }

      closeCommentModal()
    }
    else {
      this.setState(() => ({ showError: true }))
    }
	}

  render() {
		const { status, closeCommentModal, data, mode } = this.props
		const { showError } = this.state

    return (
      <ReactModal
          overlayClassName='overlay'
          isOpen={status}
          onRequestClose={closeCommentModal}
          contentLabel='Modal'
        >
          <div className="comment-modal-content">
            <h1 className="title">
              {mode === 'edit' && "Edit Comment"}
              {mode === 'add' && "Add Comment"}
            </h1>

            <form onSubmit={this.handleSubmit}>

              {showError && (
                <div className="notification is-danger">
                  You must fill up all the fields!
                </div>
              )}

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

              <div className="field is-grouped">
                <div className="control">
                  <button onClick={() => closeCommentModal()} type="button" className="button is-link">Cancel</button>
                </div>
                <div className="control">
                  <button type="submit" className="button is-primary">
                    {mode === 'edit' && "Edit Comment"}
                    {mode === 'add' && "Add Comment"}
                  </button>
                </div>
              </div>
            </form>
          </div>
      </ReactModal>
    );
  }
}

function mapStateToProps () {
  return {

  }
}

function mapDispatchToProps (dispatch) {
  return {
    createComment: (comment) => dispatch(createComment(comment)),
    updateComment: (comment) => dispatch(updateComment(comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentModal)
