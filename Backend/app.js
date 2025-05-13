require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userroutes = require('./routes/userroutes')
const adminroutes = require('./routes/adminroutes')
const path = require("path");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:[ process.env.FRONTEND_URL || "http://localhost:5173"],
    credentials: true
  }));

app.use(express.static(path.join(__dirname, "dist")));


app.use('/api/user', userroutes);
app.use('/api/admin', adminroutes);

module.exports = app;
