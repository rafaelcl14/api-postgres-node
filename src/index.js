const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
// middlawares funçoes que se executão antes de chagar nas rotas
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

//router
app.use(require("./routers/index"));

app.listen(process.env.PORT || 4000);

console.log("Server on port 4000");
