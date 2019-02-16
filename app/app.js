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
console.log('postHeader', postHeader);

function isCassette(release) {
  console.log('release.format', release.format);
  for (let index = 0; index < release.format.length; index++) {
    if (release.format[index] === 'Cassette' || release.format[index] === 'Cass' || release.format[index] === 'MC') {
      return release;
    }
  }
}

function filterResults(res, filterCb) {
  return res.filter(isCassette);
}

function handleDataSearch(results) {
  results.then((res) => {
    const cassList = filterResults(res, isCassette);
    const cassListTitles = cassList.map((release) => {
      return release.title;
    });
    console.log('cassListTitles', cassListTitles);
  });
}

function handleData(res) {
  //res.then((db) => {
    const cassList = filterResults(res.results, isCassette);
    const cassListTitles = cassList.map((release) => {
      return release.title;
    });
    console.log('cassListTitles', cassListTitles);
  //});
}

fetch(`http://localhost:8080/api/search`, postHeader)
  .then((response) => {
    if (response.ok) {
      const resJSON = response.json();
      handleDataSearch(resJSON);
    } else {
      throw err;
    }
  })
  .catch((err) => {
    console.warn(err);
  });

