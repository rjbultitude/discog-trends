// search data
function params(page, sort, sortOrder, perPage) {
  return {
    page: page || 1,
    sort: sort || 'year',
    sort_order: sortOrder || 'asc',
    per_page: perPage || 20,
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

export default async function getDiscogsData(callback, query, page) {
  const postHeader = getDiscogsPostHeader(query, page);
  console.log('postheader', postHeader);
  try {
    const response = await fetch(
      `http://localhost:8080/api/search`,
      postHeader
    );
    let res;
    if (response.ok) {
      res = await response.json();
      callback(res);
    } else {
      throw new Error('response was not ok');
    }
  } catch (err) {
    console.warn('discogs request error', err);
    callback('error');
  }
}
