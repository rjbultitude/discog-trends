const filterFuncs = require('./filterData.js');

// mocks
const release = {
  style: ['Modern Classical', 'Musique Concrète', 'Experimental'],
  thumb:
    'https://img.discogs.com/8zRsH2sGxtRd3IjZIL9Z5ipYtQs=/fit-in/150x150/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-939021-1408883618-1447.jpeg.jpg',
  format: ['Vinyl', 'LP', 'Compilation'],
  country: 'France',
  barcode: [],
  uri: '/Various-Panorama-De-Musique-Concr%C3%A8te/master/277852',
  master_url: 'https://api.discogs.com/masters/277852',
  label: [
    'Club National Du Disque',
    'Radiodiffusion-Télévision Française (RTF)',
  ],
  genre: ['Electronic'],
  catno: 'CND 15-16',
  community: {
    want: 121,
    have: 49,
  },
  year: '1958',
  cover_image:
    'https://img.discogs.com/x1bx2KO7IBU9oK6huJluEa924rE=/fit-in/409x376/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-939021-1408883618-1447.jpeg.jpg',
  title: 'Various - Panorama De Musique Concrète',
  resource_url: 'https://api.discogs.com/masters/277852',
  master_id: 277852,
  type: 'master',
  id: 277852,
};

test('getCassettes', () => {
  expect(filterFuncs.getCassettes(release)).toBeFalsy();
});
