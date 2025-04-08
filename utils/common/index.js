const { URL } = require("url");

/**
 * Normalize a URL by resolving relative URLs and ensuring the same origin.
 * Also filters out anchors, mailto, and JavaScript links.
 *
 * @param {string} href - The href attribute from <a> tag
 * @param {string} base - The base domain URL
 * @returns {string|null} - Normalized absolute URL or null if invalid
 */
function normalizeUrl(href, base) {
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("javascript:")
  ) {
    return null;
  }

  try {
    const url = new URL(href, base);
    const baseUrl = new URL(base);

    // Ensure the URL belongs to the same origin
    if (url.hostname !== baseUrl.hostname) return null;

    // Remove fragments and normalize
    url.hash = "";
    return url.toString();
  } catch (err) {
    return null;
  }
}

/**
 * Simple delay utility (for rate limiting or politeness)
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise}
 */
function delay(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  normalizeUrl,
  delay,
};
