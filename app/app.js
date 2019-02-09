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

const params = {sort: 'year', sort_order: 'asc', page: 1, per_page: 100};
const searchTerm = 'genre=Electronic';

const res = db.search(searchTerm, params, (err, res)=> {
  if (err !== null) {
    console.warn('there was an error: ', err);
  } else {
    const cassList = filterResults(res.results, isCassette);
    const cassListTitles = cassList.map((release) => {
      return release.title;
    });
    console.log('cassListTitles', cassListTitles);
  }
});
