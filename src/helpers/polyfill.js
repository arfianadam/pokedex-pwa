export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getPokemonId(url) {
  return url.substring(44, url.lastIndexOf('/'));
}

export function getTypeId(url) {
  return url.substring(41, url.lastIndexOf('/'));
}

export function removeUnderscore(str) {
  return str.replace('_', ' ');
}
