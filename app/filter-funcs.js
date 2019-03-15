export function filterData(results, filterFn, getDemand) {
  const resultsFiltered = results.filter(filterFn);
  if (resultsFiltered.length > 0) {
    const resultsFilteredTitles = resultsFiltered.map((release) => {
      return {
        title: release.title,
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

export function getDemand(release, mult = 1) {
  if (release.community.want > release.community.have * mult) {
    return 'true';
  } else {
    return 'false'
  }
}
