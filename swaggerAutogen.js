"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// Swagger Autogen
// https://swagger-autogen.github.io/docs/
// $ npm i swagger-autogen # JSON creator
// $ npm i swagger-ui-express
// $ npm i redoc-express
/* ------------------------------------------------------- */

require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000

/* ------------------------------------------------------- *
const options = {
    openapi:          <string>,     // Enable/Disable OpenAPI.                        By default is null
    language:         <string>,     // Change response language.                      By default is 'en-US'
    disableLogs:      <boolean>,    // Enable/Disable logs.                           By default is false
    autoHeaders:      <boolean>,    // Enable/Disable automatic headers recognition.  By default is true
    autoQuery:        <boolean>,    // Enable/Disable automatic query recognition.    By default is true
    autoBody:         <boolean>,    // Enable/Disable automatic body recognition.     By default is true
    writeOutputFile:  <boolean>     // Enable/Disable writing the output file.        By default is true
};
/* ------------------------------------------------------- */

// const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0', language: 'tr-TR'})
const swaggerAutogen = require('swagger-autogen')()

const packageJson = require('./package.json')

const document = {
    // info: {
    //     version: "1.0.0",
    //     title: "Personnel API",
    //     description: "Personnel Management System v1.0",
    //     termOfService: "http://127.0.0.1/#",
    //     contact: { name: "Clarusway", email: "qadir@clarusway.com" },
    //     license: { name: "Apache License" }
    // },
    info: {
        version: packageJson.version,
        title: packageJson.name,
        description: packageJson.description,
        // termOfService: "http://127.0.0.1/#",
        contact: { name: packageJson.author, email: "qadir@clarusway.com" },
        license: { name: packageJson.license }
    },
    host: HOST + ':' + PORT,
    basePath: '/',
    schemes: ['http', 'https'],
    securityDefinitions: {
        // Simple Token:
        Token: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'Simple Token * Example: <b>Token ...tokenKey...</b>'
        }
    },
    security: [{ Token: [] }],
    // Models & their fields:
    definitions: {
        "Department": require('./src/models/department').schema.obj,
        "Personnel": require('./src/models/personnel').schema.obj,
    }
}

console.log()

const routes = ['./index.js']
const outputFile = './swagger.json'

// RUN:
swaggerAutogen(outputFile, routes, document)

// gerekli paketleri yükle, 
// bu dosyayı yaz
// bu dosyayı bitirdiğinde: node swaggerAutogen.js
// sonra index.js deki DOCUMENTATION kısmını da yaz