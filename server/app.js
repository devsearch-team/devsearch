
//importing modules
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const employerAuthRouter=require('./routes/empAuthRoutes')
const apiRouter = require("./api/api.js");

//define the global variables
const app = express();
const port = process.env.PORT || 4000
const dbConn = process.env.MONGODB_URI

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
        }
    }
)

app.use(express.json())
app.use(morgan('dev'))
//app.use(express.static('../client/build'))

app.use("/employer/auth", employerAuthRouter)
app.use('/api', apiRouter);



app.listen(port, () => {
    console.log(`devsearch server is running on port http://localhost:${port}`)
}
)
