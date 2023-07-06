require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const { DB } = require('./utils/constants');
const { PORT } = require('./utils/constants');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errors());
app.use(errorHandler);

mongoose.connect(DB);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
