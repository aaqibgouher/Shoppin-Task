module.exports = function isWestsideProductUrl(url) {
  const westsidePattern =
    /^https:\/\/(www\.)?westside\.com\/products\/[a-zA-Z0-9\-]+\/?$/;

  return westsidePattern.test(url);
};
