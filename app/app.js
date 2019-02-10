const searchTerm = 'genre=Electronic';
const params = {sort: 'year', sort_order: 'asc', page: 1, per_page: 100};
const getHeader = new Headers({
  mode: 'no-cors',
  method: 'GET',
  credentials: 'include'
});
const postBody = JSON.stringify({
  params: params,
  searchTerm: searchTerm
});
const postHeader = {
  mode: 'no-cors',
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: postBody
};
console.log('postHeader', postHeader);

// search data
const genre = 'Electronic';
const sort = 'year'
const sort_order = 'asc'
const page = 1
const per_page = 100;


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

