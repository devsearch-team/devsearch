
//importing modules

const app = require("./app")
const mongoose = require('mongoose')


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
            console.error(`Please check and confirm that mongodb is running on ${dbConn}`)
            console.log("No database connection", err)
        } else {
            console.log("Connected to the database")
            app.listen(port, () => {
                console.log(`devsearch server is running on port http://localhost:${port}`)
            })
        }
    }
)

