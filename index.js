const express = require("express");
require("dotenv").config();
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api", routes);

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
