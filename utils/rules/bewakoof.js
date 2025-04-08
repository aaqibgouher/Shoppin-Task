module.exports = function isBewakoofProductUrl(url) {
  const pattern = /\/p\/[a-z0-9-]+$/i;
  return url.includes("bewakoof.com") && pattern.test(url);
};
