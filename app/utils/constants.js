// Constants
export const CASS_STRING = 'Cassette';
export const VINYL_STRING = 'Vinyl';
export const CD_STRING = 'CD';
export const GENRES_STR = 'genres';
export const FORMATS_STR = 'formats';
export const FORMATS = ['--', CASS_STRING, VINYL_STRING, CD_STRING];
export const GENRES = [
  '--',
  'Rock',
  'Electronic',
  'Pop',
  `Folk${encodeURIComponent(',')} World ${encodeURIComponent('&')} Country`,
  'Jazz',
  `Funk ${encodeURIComponent('/')} Soul`,
  'Classical',
  'Hip Hop',
  'Latin',
  'Reggae',
  `Stage ${encodeURIComponent('&')} Screen`,
  'Blues',
  'Non-Music',
  "Children's",
  `Brass ${encodeURIComponent('&')} Military`,
];
