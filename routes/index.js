const express = require("express");
const router = express.Router();

// controller
const crawlerController = require("../controller/crawlerController");

// grouped routes
router.use("/crawl", crawlerController.crawl);

// export
module.exports = router;
