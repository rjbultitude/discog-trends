const searchTerm = 'genre=Electronic';
const params = {sort: 'year', sort_order: 'asc', page: 1, per_page: 100};
const getHeader = {
  mode: 'no-cors',
  method: 'get',
  credentials: 'include'
};
const postBody = JSON.stringify({
  params: params,
  searchTerm: searchTerm
});
const postHeader = {
  mode: 'no-cors',
  method: 'POST',
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: postBody
};


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

function handleDataSearch(res) {
  res.then((db) => {
    console.log('db', db);
    db.search(searchTerm, params, (err, res) => {
      if (err !== null) {
        console.warn(err);
      } else {
        const cassList = filterResults(res.results, isCassette);
        const cassListTitles = cassList.map((release) => {
          return release.title;
        });
        console.log('cassListTitles', cassListTitles);
      }
    });
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
      console.log('response', response);
      //handleDataSearch(response.json());
    } else {
      throw err;
    }
  })
  .catch((err) => {
    console.warn(err);
  });

