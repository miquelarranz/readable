
export function fetchCategories () {

  return fetch(
    `http://localhost:3001/categories`, {headers: { 'Authorization': 'Readable' }})
    .then((res) => res.json())
}
