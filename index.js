const express = require("express");
const cors = require('cors');

const app = express();
const { BASE_URL, HOST, PORT } = require("./config");

app.use(cors());

const routes = require("./src/routes/router");

app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send({
    message: "alive /",
  });
});


app.use("/uploads", express.static("uploads"));

app.listen(PORT, HOST, () => {
  console.log(`Server is running on ${BASE_URL}`);
});
