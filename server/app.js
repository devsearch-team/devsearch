
//importing modules
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()

const employerAuthRouter=require('./routes/empAuthRoutes')
const seekerAuthRouter=require('./routes/seekerAuthRoutes')
const jobsRouter=require('./routes/jobsRoutes')
const apiRouter = require("./api/api.js");

//define the global variables
const app = express();
const port = process.env.PORT || 4000
const dbConn = process.env.MONGODB_URI

console.log("MongoDB URL:", dbConn);


mongoose.connect(dbConn,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    err => {
        if (err){
            console.log("No database connection", err)
        } else {
            console.log("Connected to the database")
            app.listen(port, () => {
                console.log(`devsearch server is running on port http://localhost:${port}`)
            })
        }
    }
)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "10mb" }))
app.use(morgan('dev'))
//app.use(express.static('../client/build'))

// app.use((req, res, next) => {

//     if(req.headers && req.headers.authorization){
//         jwt.verify(req.headers.authorization.split(' ')[1],process.env.EMPLOYER_SECRET_KEY,(err, decode)=>{
//             if (err) {
//                 req.user = undefined
//             }else{
//                 req.user = decode
//             }
//             // console.log("req.user",req.user)
//             console.log("req.headers",req.headers)
//             next()
//         })
//     }else{
//         req.user = undefined
//         console.log("req.headers",req.headers)
//         next()
//     }
// })

app.use("/employer/auth", employerAuthRouter)
app.use("/seeker", seekerAuthRouter)
app.use("/jobs", jobsRouter)
app.use('/api', apiRouter);


module.exports = app // for testing
