// search data
const genre = 'Electronic';
const sort = 'year'
const sortOrder = 'asc'
const page = 1
const perPage = 100;
// params
const searchTerm = `genre=${genre}`;
const params = {sort: sort, sort_order: sortOrder, page: page, per_page: perPage};
//headers
const getHeader = new Headers({
  mode: 'no-cors',
  method: 'GET',
  credentials: 'include'
});
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

function isCassette(release) {
  for (let index = 0; index < release.format.length; index++) {
    if (release.format[index] === 'Cassette' || release.format[index] === 'Cass' || release.format[index] === 'MC') {
      return release;
    }
  }
}

function filterResults(res, filterCb) {
  return res.filter(filterCb);
}

function handleDataSearch(results) {
  console.log('results', results);
  const cassList = filterResults(results, isCassette);
  if (cassList.length > 0) {
    const cassListTitles = cassList.map((release) => {
      return release.title;
    });
    //console.log('cassListTitles', cassListTitles);
    return cassListTitles;
  } else {
    console.warn('no results');
  }
}

function getDiscogsData(callback) {
  return fetch(`http://localhost:8080/api/search`, postHeader)
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => {
          // console.log('res', res);
          callback(handleDataSearch(res.results));
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

