console.log('process.env.development', process.env.development);
console.log('process.env.production', process.env.production);

const API_URL = process.env.production
  ? '/.netlify/functions/proxy'
  : 'http://localhost:8080/search';

// search data
function params(page = 1, sort = 'year', sortOrder = 'asc', perPage = 20) {
  return `page=${page}&sort=${sort}&sort_order=${sortOrder}&per_page=${perPage}`;
}

// Request headers and body
function getQueryString(query, page) {
  const pageStr = params(page);
  return `?${pageStr}&searchTerm=${query}`;
}

export default async function getDiscogsData(callback, query, page) {
  const getReqString = getQueryString(query, page);
  const requestURL = `${API_URL}${getReqString}`;
  console.log('getReqString', getReqString);
  console.log('requestURL', requestURL);
  try {
    const response = await fetch(requestURL);
    let res;
    if (response.ok) {
      res = await response.json();
      callback(res);
    } else {
      throw new Error('response was not ok', response);
    }
  } catch (err) {
    console.warn('discogs request error', err);
    callback('error');
  }
}
