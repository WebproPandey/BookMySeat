const http = require("http");
const app = require("./app");
require("dotenv").config();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db");

connectDB(); 

server.listen(PORT, () => {
  console.log(`Server is started at ${PORT}`);
});
