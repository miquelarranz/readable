
export function fetchCategories () {

  return fetch(
    `http://localhost:3001/categories`, {headers: { 'Authorization': 'Categories' }})
    .then((res) => res.json())
}
