const express = require("express");

const app = express();

// middlawares funçoes que se executão antes de chagar nas rotas
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//router
app.use(require("./routers/index"));

app.listen(3000);

console.log("Server on port 3000");
