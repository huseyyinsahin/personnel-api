"use strict";

require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

const swaggerAutogen = require("swagger-autogen")();

const packageJson = require("./package.json");

const document = {
  info: {
    version: packageJson.version,
    title: packageJson.name,
    description: packageJson.description,

    contact: { name: packageJson.author, email: "qadir@clarusway.com" },
    license: { name: packageJson.license },
  },
  host: HOST + ":" + PORT,
  basePath: "/",
  schemes: ["http", "https"],
  securityDefinitions: {
    Token: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Simple Token * Example: <b>Token ...tokenKey...</b>",
    },
  },
  security: [{ Token: [] }],

  definitions: {
    Department: require("./src/models/department").schema.obj,
    Personnel: require("./src/models/personnel").schema.obj,
  },
};


const routes = ["./index.js"];
const outputFile = "./swagger.json";

swaggerAutogen(outputFile, routes, document);
