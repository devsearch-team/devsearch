// require('dotenv').config()
// const dbConn = process.env.MONGODB_URI
const Job = require('./models/job')
const mongoose = require('mongoose')
const Employer = require('./models/employer')
require('dotenv').config()

const dbConn = process.env.MONGODB_URI
mongoose.connect(dbConn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
},
err => {
    if (err){
        console.log("No database connection", err)
    } else {
        seedJobs()
    }
})

		
function seedJobs(){
    const quantity = 20
		let jobs = []
		for (let i = 0; i < quantity; i++) { 
			const randomEmployer =  Employer.findOne()

			if (randomEmployer) {
				jobs.push(
					new Job({
						title: `this is job number ${i}`,
						description: 'any description',
						employer: randomEmployer._id,
						location: "Brisbane",
                        maxPay:"90000",
                        minPay:"70000",
						created_at: Date.now()
					})
				)
			}
		}

		//await Jobs.remove()
        var done = 0
		jobs.forEach(job => {
            job.save(function(err, result) {
                done++;
                if (done === jobs.length) {
                    exit();
                }
            })
		})
}
        function exit() {
            mongoose.disconnect();
        }

		console.log('Jobs Collection has been Populated!')
	

