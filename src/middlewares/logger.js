"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
//* LOGGER
// $ npm i morgan
// https://expressjs.com/en/resources/middleware/morgan.html

const morgan = require('morgan')

// Morgain is middleware
// app.use(morgan('tiny'))
// app.use(morgan('short'))
// app.use(morgan('dev'))
// app.use(morgan('common'))
// app.use(morgan('combined'))
// Custom Logs:
// app.use(morgan('TIME=":date[iso]" - URL=":url" - Method=":method" - IP=":remote-addr" - Ref=":referrer" - Status=":status" - Sign=":user-agent" (:response-time[digits] ms)'))

// Write to file:
// https://nodejs.org/api/fs.html#file-system-flags
// const fs = require('node:fs')
// app.use(morgan('combined', {
//   stream: fs.createWriteStream('./access.log', { flags: 'a+' })
// }))

// Write to file day-by-day:
const fs = require('node:fs')
const now = new Date()
// console.log(now, typeof now)
const today = now.toISOString().split('T')[0]
// console.log(today)
// app.use(morgan('combined', {
//   stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
// }))

module.exports = morgan('combined', {
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
})

/* ------------------------------------------------------- */