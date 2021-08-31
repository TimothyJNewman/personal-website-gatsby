/*
* File with commonly used utility functions
*/

const getFormattedDate = (dateString) => {
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString([], options);
}

const getFormattedLink = (hostname, path) => {
  return hostname + path;
}

export { getFormattedDate, getFormattedLink };