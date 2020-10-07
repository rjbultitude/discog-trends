const DISCOGS_URL_BASE = 'http://www.discogs.com';

export function getDemand(release, mult = 2) {
  if (release.community.want >= release.community.have * 10) {
    return {
      text: 'Extremely high',
      rank: 5,
    };
  }
  if (release.community.want >= release.community.have * 5) {
    return {
      text: 'Very high',
      rank: 4,
    };
  }
  if (release.community.want >= release.community.have * mult) {
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
  if (release.community.have <= 2) {
    return {
      text: 'Extremely rare',
      rank: 4,
    };
  }
  if (release.community.have <= 10) {
    return {
      text: 'Very rare',
      rank: 3,
    };
  }
  if (release.community.have <= 20) {
    return {
      text: 'Rare',
      rank: 2,
    };
  }
  if (release.community.have <= 40) {
    return {
      text: 'Common',
      rank: 1,
    };
  }
  return {
    text: 'Very common',
    rank: 0,
  };
}

// Take search results data and filter it
// using a callback function
// getDemand and getScarcity are a dependencies
export function processData(results) {
  if (results.length > 0) {
    const resultsFilteredTitles = results.map((release) => {
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

export function sortByRank(releases, key, order) {
  const releasesCopy = releases.concat();
  function compareNumsAsc(a, b) {
    return a[key].rank - b[key].rank;
  }
  function compareNumsDesc(a, b) {
    return b[key].rank - a[key].rank;
  }
  if (order === 'desc' || order === '') {
    return releasesCopy.sort(compareNumsAsc);
  }
  return releasesCopy.sort(compareNumsDesc);
}

export function getStyle(release, styleTerm) {
  for (let index = 0; index < release.style.length; index += 1) {
    if (release.style[index] === styleTerm) {
      return release;
    }
  }
  return false;
}
