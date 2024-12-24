"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const express = require("express");
const { dbConnection, mongoose } = require("./src/configs/dbConnection");
const app = express();

/* ------------------------------------------------------- */

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

require("express-async-errors");

/* ------------------------------------------------------- */

app.use(require("./src/middlewares/logger"));

/* ------------------------------------------------------- */

app.use("/documents/json", (req, res) => {
  res.sendFile("swagger.json", { root: "." });
});

const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("./swagger.json");
app.use(
  "/documents/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJson, {
    swaggerOptions: { persistAuthorization: true },
  })
);

const redoc = require("redoc-express");
app.use(
  "/documents/redoc",
  redoc({ specUrl: "/documents/json", title: "Redoc UI" })
);

/* ------------------------------------------------------- */
dbConnection();

app.use(express.json());

/* ------------------------------------------------------- */

app.use(require("./src/middlewares/authentication"));

app.use(require("./src/middlewares/queryHandler"));

/* ------------------------------------------------------- */

app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PERSONNEL API",
    session: req.session,
  });
});
/* ------------------------------------------------------- */

app.use(require("./src/routes/index"));

/* ------------------------------------------------------- */

app.all("*", async (req, res) => {
  res.status(404).send({
    error: true,
    message: "Route not available",
  });
});

app.use(require("./src/middlewares/errorHandler"));

app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */

if (process.env.NODE_ENV == "development") {
  return;
  require("./src/helpers/dataCreate")()
    .then((res) => console.log("Data synched"))
    .catch((err) => console.error("Data could not synched"));
}
