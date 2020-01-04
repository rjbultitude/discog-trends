const DISCOGS_URL_BASE = 'http://www.discogs.com';

export function getDemand(release, mult = 2) {
  if (release.community.want > release.community.have * mult) {
    return 'High';
  }
  if (release.community.want > release.community.have) {
    return 'Medium';
  }
  return 'Low';
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
      };
    });
    return resultsFilteredTitles;
  }
  return [];
}

export function getCassettes(release) {
  const hasFormatProperty = Object.prototype.hasOwnProperty.call(
    release,
    'format'
  );
  if (hasFormatProperty) {
    for (let index = 0; index < release.format.length; index += 1) {
      if (
        release.format[index] === 'Cassette' ||
        release.format[index] === 'Cass' ||
        release.format[index] === 'MC'
      ) {
        return release;
      }
      return false;
    }
  }
  throw new Error('no property release');
}

export function getVinyl(release) {
  for (let index = 0; index < release.format.length; index += 1) {
    if (
      release.format[index] === 'Vinyl' ||
      release.format[index] === 'Test Pressing' ||
      release.format[index] === 'White Label' ||
      release.format[index] === '7"' ||
      release.format[index] === '10"' ||
      release.format[index] === '12"' ||
      release.format[index] === '33+⅓ RPM' ||
      release.format[index] === '45 RPM' ||
      release.format[index] === '78 RPM'
    ) {
      return release;
    }
  }
  return false;
}

export function getDigital(release) {
  for (let index = 0; index < release.format.length; index += 1) {
    if (
      release.format[index] === 'WAV' ||
      release.format[index] === 'FLAC' ||
      release.format[index] === 'MP3' ||
      release.format[index] === 'AIFF' ||
      release.format[index] === 'AAC'
    ) {
      return release;
    }
  }
  return false;
}

export function getCD(release) {
  for (let index = 0; index < release.format.length; index += 1) {
    if (
      release.format[index] === 'CD' ||
      release.format[index] === 'CDr' ||
      release.format[index] === 'CD-ROM' ||
      release.format[index] === 'Compact Disc'
    ) {
      return release;
    }
  }
  return false;
}

export function getStyle(release, styleTerm) {
  for (let index = 0; index < release.style.length; index += 1) {
    if (release.style[index] === styleTerm) {
      return release;
    }
  }
  return false;
}
