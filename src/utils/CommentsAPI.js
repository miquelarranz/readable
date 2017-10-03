
export function fetchComments (postId) {

  return fetch(
    'http://localhost:3001/posts/' + postId + '/comments', {headers: { 'Authorization': 'Readable' }})
    .then((res) => res.json())
}

export function createComment (comment) {

  return fetch(
    'http://localhost:3001/comments', {method: 'post', body: JSON.stringify(comment), headers: { 'Authorization': 'Readable', 'Content-Type': 'application/json'}})
    .then((res) => res.json())
}

export function updateComment (comment) {

  return fetch(
    'http://localhost:3001/comments/' + comment.id, {method: 'put', body: JSON.stringify(comment), headers: { 'Authorization': 'Readable', 'Content-Type': 'application/json'}})
    .then((res) => res.json())
}

export function deleteComment (commentId) {

  return fetch(
    'http://localhost:3001/comments/' + commentId, {method: 'delete', headers: { 'Authorization': 'Readable' }})
    .then((res) => res.json())
}

export function voteComment (commentId, option) {

  return fetch(
    'http://localhost:3001/comments/' + commentId, {method: 'post', body: JSON.stringify({ option }), headers: { 'Authorization': 'Readable', 'Content-Type': 'application/json'}})
    .then((res) => res.json())
}
