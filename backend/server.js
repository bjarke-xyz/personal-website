const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get("/api/projects", (req, res) => {
  //  res.send({ express: "Hello From Express" });
  res.sendFile(`${__dirname}/data/projects.json`);
});

app.post("/api/world", (req, res) => {
  res.send(`I received your POST request. This is what you sent me: ${req.body.post}`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
