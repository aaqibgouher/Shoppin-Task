module.exports = function isVirgioProductUrl(url) {
  const virgioPattern =
    /^https:\/\/(www\.)?virgio\.com\/products\/[a-zA-Z0-9\-]+\/?$/;

  return virgioPattern.test(url);
};
