// search data
const genre = 'Electronic';
const sort = 'year';
const sortOrder = 'asc';
const perPage = 100;
// params
const searchTerm = `genre=${genre}`;

function params(page) {
  return {
    page: page || 1,
    sort,
    sort_order: sortOrder,
    per_page: perPage,
  };
}

// Request headers and body

function postBodyJSON(page) {
  return JSON.stringify({
    params: params(page),
    searchTerm,
  });
}

function getDiscogsPostHeader(page) {
  return {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: postBodyJSON(page),
  };
}

function getDiscogsData(callback, page) {
  const postHeader = getDiscogsPostHeader(page);
  return fetch(`http://localhost:8080/api/search`, postHeader)
    .then(response => {
      if (response.ok) {
        response.json().then(res => {
          callback(res.results);
        });
      } else {
        throw new Error('response was not ok');
      }
    })
    .catch(err => {
      console.warn('discogs request error', err);
    });
}

export default getDiscogsData;
