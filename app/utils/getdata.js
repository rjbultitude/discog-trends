// search data
const genre = 'Electronic';
const sort = 'year'
const sortOrder = 'asc'
const page = 1
const perPage = 100;
// params
const searchTerm = `genre=${genre}`;
const params = {sort: sort, sort_order: sortOrder, page: page, per_page: perPage};
//Request headers and body
const postBodyJSON = JSON.stringify({
  params: params,
  searchTerm: searchTerm
});
const postHeader = {
  method: 'POST',
  mode: 'same-origin',
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  },
  body: postBodyJSON
};

function getDiscogsData(callback) {
  return fetch(`http://localhost:8080/api/search`, postHeader)
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => {
          callback(res.results);
        });
      } else {
        throw err;
      }
    })
    .catch((err) => {
      console.warn(err);
    });
}

export { getDiscogsData as getDiscogsData};

