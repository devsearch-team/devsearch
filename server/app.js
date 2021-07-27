
//importing modules
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const apiRouter = require("./api/api.js");

//define the global variables
const app = express();
const port = process.env.PORT || 4000

app.use(morgan('dev'))
//app.use(express.static('../client/build'))

app.use('/api', apiRouter);


app.listen(port, () => {
    console.log(`devsearch server is running on port http://localhost:${port}`)
}
)
