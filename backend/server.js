import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import routes from './src/Routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// middleware for XSS attacks
app.use(xss());

// to replace NoSQL Injection
app.use(
  mongoSanitize({
    replaceWith: '_',
  }),
);

app.use('/api/', routes);

app.use((req, res, next) => {
  const error = new Error('COULD NOT FIND THIS ROUTE', 404);
  throw error;
});

app.use((error, req, res, next) => {
  res
    .status(error.code || 500)
    .send({ ...error, message: error.message || 'Unknown error occured' });
});

mongoose
  .connect(process.env.DATABASE_CONNECT)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((error) => console.log('unable to connect DB' + error));
