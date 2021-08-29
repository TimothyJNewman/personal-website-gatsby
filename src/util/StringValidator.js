// Adapted from string-sanitizer package

//Just alphabets and numbers
const sanitize = (str) => {
  return str.replace(/[^a-zA-Z0-9\s]/g, '');
};

//Removes special characters except .,?!()
const sanitizeKeepUnicode = (str) => {
  // eslint-disable-next-line
  return str.replace(/[`~@#$%^&*_|+\-=;:'"<>\{\}\[\]\\\/]/gi, '');
};

//Username & Email
const isEmail = (str) => {
  // eslint-disable-next-line
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (regex.test(str)) {
    return str;
  } else {
    return false;
  }
};

export { sanitize, sanitizeKeepUnicode, isEmail };
