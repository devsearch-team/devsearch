
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongod;



module.exports.createDb = async () => {

  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  console.log("TEST MongoDB URL:", uri);

  mongoose.connect(uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    },
    err => {
      if (err) {
        console.log("No database connection", err)
      } else {
        console.log("Connected to the database")
      }
    }
  )


  // return process.env.MONGODB_URI
}
module.exports.dropDb = async () => {
  // console.log("DROP TEST DB")
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}