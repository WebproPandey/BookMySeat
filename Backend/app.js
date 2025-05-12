const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userroutes = require('./routes/userroutes')
const adminroutes = require('./routes/adminroutes')

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userroutes);
app.use('/api/admin', adminroutes);

module.exports = app;
