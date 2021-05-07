require('dotenv').config()
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const appointmentController = require("./controller/appointment-controller");
const affiliateController = require("./controller/affiliate-controller");

app.use("/appointment", appointmentController);

app.use("/affiliate", affiliateController);

app.listen(port,
  () => console.log(`Server running on port ${port}`)
)