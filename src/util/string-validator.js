// Adapted from string-sanitizer package

// Just alphabets and numbers
const sanitize = (str) => str.replace(/[^a-zA-Z0-9\s]/g, '');

// Removes special characters except .,?!()
// eslint-disable-next-line no-useless-escape
const sanitizeKeepUnicode = (str) =>
  str.replace(/[`~@#$%^&*_|+\-=;:'"<>\{\}\[\]\\\/]/gi, '');

// Username & Email
const isEmail = (str) => {
  // eslint-disable-next-line
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (regex.test(str)) {
    return str;
  }
  return false;
};

export { sanitize, sanitizeKeepUnicode, isEmail };
