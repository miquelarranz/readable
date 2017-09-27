
export function fetchPosts () {

  return fetch(
    `http://localhost:3001/posts`, {headers: { 'Authorization': 'Posts' }})
    .then((res) => res.json())
}

export function fetchPostsByCategory (category) {
  
  return fetch(
    'http://localhost:3001/' + category + '/posts', {headers: { 'Authorization': 'Posts' }})
    .then((res) => res.json())
}
