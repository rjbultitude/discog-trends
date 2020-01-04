// search data
const sort = 'year';
const sortOrder = 'asc';
const perPage = 20;

function params(page) {
  return {
    page: page || 1,
    sort,
    sort_order: sortOrder,
    per_page: perPage,
  };
}

// Request headers and body

function postBodyJSON(query, page) {
  return JSON.stringify({
    params: params(page),
    searchTerm: query,
  });
}

function getDiscogsPostHeader(query, page) {
  return {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: postBodyJSON(query, page),
  };
}

function getDiscogsData(callback, query, page) {
  const postHeader = getDiscogsPostHeader(query, page);
  console.log('postheader', postHeader);
  return fetch(`http://localhost:8080/api/search`, postHeader)
    .then(response => {
      if (response.ok) {
        response.json().then(res => {
          callback(res);
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
