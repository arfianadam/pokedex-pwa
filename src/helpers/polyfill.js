export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getPokemonId(url) {
  return url.substring(44, url.lastIndexOf('/'));
}
