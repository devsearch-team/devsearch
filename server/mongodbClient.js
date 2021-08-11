const MongoMemoryServer = require('mongodb-memory-server')

const  mongodbClient = async function (isTest){


    console.log('all env:',process.env);
    if(isTest){
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        process.env.MONGODB_URI = uri;
    }
    else return process.env.MONGODB_URI
    
}
module.exports = mongodbClient;