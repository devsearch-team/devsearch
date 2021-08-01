const multer = require("multer")
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

const {AWS_ACCESS_KEY,AWS_SECRET_KEY} = process.env
aws.config.update({
    secretAccessKey: AWS_SECRET_KEY,
    accessKeyId:AWS_ACCESS_KEY ,
    region: 'ap-southeast-2'
});

s3 = new aws.S3()

const storage=multerS3({
    s3: s3,
    bucket: 'dev-search',
    acl: 'public-read',
    key: function (req, file, cb) {
        console.log(file);
        cb(null, `${req.user.id}/${file.originalname}`);
    }
})

const parser = multer({ storage: storage })

module.exports = parser