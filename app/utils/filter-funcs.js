const DISCOGS_URL_BASE = 'http://www.discogs.com';

export function getDemand(release, mult = 2) {
  if (release.community.want > release.community.have * 10) {
    return {
      text: 'Extremely high',
      rank: 5,
    };
  }
  if (release.community.want > release.community.have * 5) {
    return {
      text: 'Very high',
      rank: 4,
    };
  }
  if (release.community.want > release.community.have * mult) {
    return {
      text: 'High',
      rank: 3,
    };
  }
  if (release.community.want > release.community.have) {
    return {
      text: 'Low',
      rank: 2,
    };
  }
  if (release.community.want === release.community.have) {
    return {
      text: 'None',
      rank: 1,
    };
  }
  if (release.community.want < release.community.have) {
    return {
      text: 'Negative',
      rank: 0,
    };
  }
  return 'Unknown';
}

export function getScarcity(release) {
  if (release.community.have > 2) {
    return {
      text: 'Extremely rare',
      rank: 3,
    };
  }
  if (release.community.have > 10) {
    return {
      text: 'Very rare',
      rank: 2,
    };
  }
  if (release.community.have > 20) {
    return {
      text: 'Rare',
      rank: 1,
    };
  }
  return {
    text: 'Common',
    rank: 0,
  };
}

// Take search results data and filter it
// using a callback function
// getDemand is a dependency
export function processData(results) {
  if (results.length > 0) {
    const resultsFilteredTitles = results.map(release => {
      return {
        title: release.title,
        url: `${DISCOGS_URL_BASE}${release.uri}`,
        demand: getDemand(release),
        scarcity: getScarcity(release),
      };
    });
    return resultsFilteredTitles;
  }
  return [];
}

function compareNumbers(a, b) {
  return a.rank - b.rank;
}

export function sortByRank(releases) {
  return releases.sort(compareNumbers);
}

export function getStyle(release, styleTerm) {
  for (let index = 0; index < release.style.length; index += 1) {
    if (release.style[index] === styleTerm) {
      return release;
    }
  }
  return false;
}
