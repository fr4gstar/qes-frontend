const path = require('path');
const express = require('express');
const app = express();

app.use(express.static("./dist/qes-frontend"));

app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "dist/qes-frontend>/" });
});

app.listen(process.env.PORT || 8080);