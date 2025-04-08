module.exports = function isNykaaProductUrl(url) {
  const nykaaProductPattern = /nykaafashion\.com\/[^/]+\/p\/\d+/;
  return nykaaProductPattern.test(url);
};
