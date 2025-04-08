const { HTTP_STATUS } = require("../utils/constants");
const Output = require("../utils/output");
const crawlerService = require("../services/crawlerService");

const crawl = async (req, res) => {
  try {
    const response = await crawlerService.crawl({});

    await Output.success(
      res,
      HTTP_STATUS.OK,
      "Successfully crawl products",
      response
    );
  } catch (error) {
    console.log(error, "from error");
    await Output.error(res, HTTP_STATUS.BAD_REQUEST, error);
  }
};

module.exports = {
  crawl,
};
