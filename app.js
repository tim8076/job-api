require('dotenv').config();
require('express-async-errors');

// extra security packages

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss');
const rateLimiter = require('express-rate-limit')

const express = require('express');
const app = express();

// connectDB
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');
// routes
const authRouter = require('./routes/auth');
const jobRouter = require('./routes/jobs');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
}))


// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/job', authenticateUser, jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, async () => {
      await connectDB(process.env.MONGO_URL);
      console.log(`Server is listening on port ${port}...`)
    });
  } catch (error) {
    console.log(error);
  }
};

start();
