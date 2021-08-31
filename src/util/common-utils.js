/*
* File with commonly used utility functions
*/

const getFormattedDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString([], options);
};

const getFormattedLink = (hostname, path) => hostname + path;

export { getFormattedDate, getFormattedLink };
