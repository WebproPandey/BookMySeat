const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userroutes = require('./routes/userroutes')
const adminroutes = require('./routes/adminroutes')
// const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userroutes);
app.use('/api/admin', adminroutes);
// app.use(errorHandler);

module.exports = app;
