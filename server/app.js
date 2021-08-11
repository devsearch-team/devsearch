
//importing modules
const express = require('express')

const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()

const employerAuthRouter=require('./routes/empAuthRoutes')
const seekerAuthRouter=require('./routes/seekerAuthRoutes')
const jobsRouter=require('./routes/jobsRoutes')
const apiRouter = require("./api/api.js");
const applicationsRouter=require("./routes/applicationsRoutes")
//define the global variables
const app = express();


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "10mb" }))
app.use(morgan('dev'))


app.use("/applications",applicationsRouter)
app.use("/employer", employerAuthRouter)
app.use("/seeker", seekerAuthRouter)
app.use("/jobs", jobsRouter)
app.use('/api', apiRouter);


module.exports = app // for testing
