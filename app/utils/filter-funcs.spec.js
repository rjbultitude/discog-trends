import {
  getDemand,
  getScarcity,
  processData,
  sortByRank,
} from './filter-funcs.js';

// mocks
const releaseVinyl = {
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
    want: 4,
    have: 2,
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

const releaseMC = {
  style: ['Modern Classical', 'Experimental'],
  thumb:
    'https://img.discogs.com/8zRsH2sGxtRd3IjZIL9Z5ipYtQs=/fit-in/150x150/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-939021-1408883618-1447.jpeg.jpg',
  format: ['Cass', 'LP'],
  country: 'UK',
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
    want: 150,
    have: 5,
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

const releaseCD = {
  style: ['Experimental'],
  thumb:
    'https://img.discogs.com/8zRsH2sGxtRd3IjZIL9Z5ipYtQs=/fit-in/150x150/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-939021-1408883618-1447.jpeg.jpg',
  format: ['CD'],
  country: 'UK',
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
    want: 20,
    have: 50,
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

const releases = [
  {
    style: ['Experimental'],
    thumb:
      'https://img.discogs.com/8zRsH2sGxtRd3IjZIL9Z5ipYtQs=/fit-in/150x150/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-939021-1408883618-1447.jpeg.jpg',
    format: ['CD'],
    country: 'UK',
    barcode: [],
    uri: '/various/master/277852',
    master_url: 'https://api.discogs.com/masters/277852',
    label: ['Test Label'],
    genre: ['Electronic'],
    catno: 'CND 15-16',
    community: {
      want: 10,
      have: 10,
    },
    year: '1990',
    cover_image:
      'https://img.discogs.com/x1bx2KO7IBU9oK6huJluEa924rE=/fit-in/409x376/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-939021-1408883618-1447.jpeg.jpg',
    title: 'Love Song',
    resource_url: 'https://api.discogs.com/masters/',
    master_id: 277852,
    type: 'master',
    id: 277852,
  },
];

const processedReleases = [
  {
    demand: { rank: 0 },
  },
  {
    demand: { rank: 2 },
  },
  {
    demand: { rank: 1 },
  },
];

describe('getDemand', () => {
  it("should return an object with 'rank' property value of 5 when 'have' is over ten times want", () => {
    expect(getDemand(releaseMC)).toEqual({
      text: 'Extremely high',
      rank: 5,
    });
  });
  it("should return an object with 'rank' property value of 3 when 'have' is over two times want", () => {
    expect(getDemand(releaseVinyl)).toEqual({
      text: 'High',
      rank: 3,
    });
  });
});

describe('getScarcity', () => {
  it("should return an object with 'rank' property value of 3 when 'have' is two or less", () => {
    expect(getScarcity(releaseVinyl)).toEqual({
      text: 'Extremely rare',
      rank: 3,
    });
  });
  it("should return an object with 'rank' property value of 0 when 'have' is over 20", () => {
    expect(getScarcity(releaseCD)).toEqual({
      text: 'Common',
      rank: 0,
    });
  });
});

describe('sortByRank', () => {
  it('should return array in ascending order', () => {
    expect(sortByRank(processedReleases, 'demand', 'desc')).toEqual([
      {
        demand: { rank: 0 },
      },
      {
        demand: { rank: 1 },
      },
      {
        demand: { rank: 2 },
      },
    ]);
  });
  it('should return array in descending order', () => {
    expect(sortByRank(processedReleases, 'demand', 'asc')).toEqual([
      {
        demand: { rank: 2 },
      },
      {
        demand: { rank: 1 },
      },
      {
        demand: { rank: 0 },
      },
    ]);
  });
  it('should return array in ascending order when sort string is empty', () => {
    expect(sortByRank(processedReleases, 'demand', '')).toEqual([
      {
        demand: { rank: 0 },
      },
      {
        demand: { rank: 1 },
      },
      {
        demand: { rank: 2 },
      },
    ]);
  });
});

describe('processData', () => {
  it('should return empty array if supplied an empty array ', () => {
    expect(processData([])).toEqual([]);
  });
  it('should return an object with properties title, url, demand and scarcity when supplied a release object from discogs', () => {
    expect(processData(releases)).toEqual([
      {
        title: 'Love Song',
        url: 'http://www.discogs.com/various/master/277852',
        demand: {
          text: 'None',
          rank: 1,
        },
        scarcity: {
          text: 'Very rare',
          rank: 2,
        },
      },
    ]);
  });
});
