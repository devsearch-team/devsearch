// require('dotenv').config()
// const dbConn = process.env.MONGODB_URI
const bcrypt = require('bcrypt')
const Job = require('./models/job')
const mongoose = require('mongoose')
const Employer = require('./models/employer')
const sample = require('lodash.sample')

require('dotenv').config()

const dbConn = process.env.MONGODB_URI


async function main() {
    mongoose.connect(dbConn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
        err => {
            if (err) {
                console.log("No database connection", err);
            }
        });
try{
    await seedEmp();
    await seedJobs();
}
catch(e){
    console.log('error while seeding', e);
}
    
    exit();
}


async function seedEmp() {
    let employer = new Employer({
        name: `IT solutions company`,
        hash_password: bcrypt.hashSync("123Ro=", 10),
        email: "emp@emp.com",
        city: "Brisbane",
        state: "QLD",
        minPay: "70000",
        about: "We are an IT solutions company"
    })
    employer.save()


}
async function seedJobs() {
    const quantity = 20
    let jobs = []
    // var randomEmployer 
    //     Employer.findOne().exec((err,emp)=>{
    //         randomEmployer=emp
    //         console.log("randomEmployer",randomEmployer)
    //         res.send(emp)
    //     })
    const users = await Employer.find()
    const randomEmployer = await sample(users)
    console.log("randomEmployer", randomEmployer)

    for (let i = 0; i < quantity; i++) {
        if (randomEmployer) {
            jobs.push(
                new Job({
                    title: `this is job number ${i}`,
                    description: 'any description',
                    employer: randomEmployer._id,
                    location: "Brisbane",
                    maxPay: "90000",
                    minPay: "70000",
                    created_at: Date.now()
                })
            )
        }
    }

    await Promise.all(jobs.map(async job => await job.save()));

}
function exit() {
    mongoose.disconnect();
}

console.log('Jobs Collection has been Populated!')


main();