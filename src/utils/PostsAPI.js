
export function fetchPosts () {

  return fetch(
    `http://localhost:3001/posts`, {headers: { 'Authorization': 'Readable' }})
    .then((res) => res.json())
}

export function fetchPostsByCategory (category) {

  return fetch(
    'http://localhost:3001/' + category + '/posts', {headers: { 'Authorization': 'Readable' }})
    .then((res) => res.json())
}

export function createPost (post) {

  return fetch(
    'http://localhost:3001/posts', {method: 'post', body: JSON.stringify(post), headers: { 'Authorization': 'Readable', 'Content-Type': 'application/json'}})
    .then((res) => res.json())
}

export function updatePost (post) {

  return fetch(
    'http://localhost:3001/posts/' + post.id, {method: 'put', body: JSON.stringify(post), headers: { 'Authorization': 'Readable', 'Content-Type': 'application/json'}})
    .then((res) => res.json())
}

export function fetchPost (postId) {

  return fetch(
    'http://localhost:3001/posts/' + postId, {headers: { 'Authorization': 'Readable' }})
    .then((res) => res.json())
}

export function deletePost (postId) {

  return fetch(
    'http://localhost:3001/posts/' + postId, {method: 'delete', headers: { 'Authorization': 'Readable' }})
    .then((res) => res.json())
}
