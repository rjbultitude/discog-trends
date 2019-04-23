import { release } from "os";

const DISCOGS_URL_BASE = 'http://www.discogs.com';

// Take search results data and filter it
// using a callback function
// getDemand is a dependency
export function filterData(results, genreString, filterFn, getDemand) {
  const resultsGenreFiltered = results.filter(getGenre, genreString);
  const resultsFormatFiltered = resultsGenreFiltered.filter(filterFn);
  if (resultsFormatFiltered.length > 0) {
    const resultsFilteredTitles = resultsFormatFiltered.map((release) => {
      return {
        title: release.title,
        url: `${DISCOGS_URL_BASE}${release.uri}`,
        demand: getDemand(release)
      };
    });
    return resultsFilteredTitles;
  } else {
    console.warn('no results');
  }
}

export function getCassettes(release) {
  for (let index = 0; index < release.format.length; index++) {
    if (release.format[index] === 'Cassette' || release.format[index] === 'Cass' || release.format[index] === 'MC') {
      return release;
    }
  }
}

export function getVinyl(release) {
  for (let index = 0; index < release.format.length; index++) {
    if (release.format[index] === 'Vinyl' || release.format[index] === '7\"' || release.format[index] === '45 RPM') {
      return release;
    }
  }
}

export function getCD(release) {
  for (let index = 0; index < release.format.length; index++) {
    if (release.format[index] === 'CD' || release.format[index] === 'Compact Disc') {
      return release;
    }
  }
}

export function getStyle(release, styleTerm) {
  for (let index = 0; index < release.style.length; index++) {
    if (release.style[index] === styleTerm) {
      return release;
    }
  }
}

export function getGenre(release) {
  for (let index = 0; index < release.genre.length; index++) {
    if (release.genre[index] === this) {
      return release;
    }
  }
}

//@ts-check
export function getDemand(release, mult = 2) {
  if (release.community.want > release.community.have * mult) {
    return 'High';
  }
  else if (release.community.want > release.community.have) {
    return 'Medium';
  } else {
    return 'Low'
  }
}
