const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const routes = require('./src/Routes/routes')
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/orders/", routes);

app.use((req, res, next) => {
  const error = new Error("COULD NOT FIND THIS ROUTE", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .send({ message: error.message || "An unknown error is occured" });
});

mongoose
  .connect(
    process.env.DATABASE_CONNECT
  )
  .then(() => {
    app.listen(port, () => {
console.log(`Server is running on port: ${port}`);
});
  })
  .catch((error) =>
    console.log("unable to connect DB" + error)
  );
