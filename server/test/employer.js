const { createDb, dropDb } = require('./helpers/dbHelper')
let Employer = require('../models/employer');
let Job=require('../models/job')
let Seeker=require('../models/seeker')
let Application=require('../models/application')
//  const { registerSeeker,createApplication } = require('./seeker')

const server = require("../app");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const { expect } = require('chai');
chai.use(chaiHttp)
let should = chai.should();

const { employerHelper, jobHelper, seekerHelper } = require("./helpers/common")



describe("Employer", async () => {

    before(async () => {
        await createDb()
        console.log('db created');
        // console.log("inside employer dbCon",dbCon)
        // server = require('../app');
    })
    beforeEach(async () => {
        console.log("---------------------------before----------------")
    })
    after(async () => {
        await dropDb();
    })

    describe("Register routes", async () => {
        const newEmployer = {
            name: "new employer",
            email: "employer@mail.com",
            password: "123abc"
        }
        it("should register an employer", async () => {
            //ACT
            const res = await employerHelper.registerEmployer(newEmployer)

            //Assert
            res.should.have.status(200)
            res.should.have.property('jwt')
            res.should.have.property('username').eql(newEmployer.name)

            it("should access profile using returned jwt after register", async () => {
                //Act
                const profileRes = await chai.request(server)
                    .post('/employer/profile')
                    .set({ "Authorization": `Bearer ${res.jwt}` })
                //assert
                profileRes.should.have.status(200)
            })
        })
    })

    describe("Sign in route", async () => {
        let newEmployer = { name: 'TEST EMPLOYER', email: 'employer@email.com', password: 'test' }
        before(async () => {
            await Employer.remove({}) //empty employers collection
            employerRes = await employerHelper.registerEmployer(newEmployer)  //only one recored exists in employers collection
        })

        it("should sign in an employer", async () => {
            //Act
            //console.log("testEmployer",testEmployer)
            const res = await chai.request(server)
                .post('/employer/auth/signin')
                .send({ email: newEmployer.email, password: newEmployer.password })

            //Assert
            res.should.have.status(200)
            res.body.should.have.property('jwt')
            res.body.should.have.property('username').eql(newEmployer.name)

            it("should access profile using returned jwt after sign in", async () => {
                //Act
                const profileRes = await chai.request(server)
                    .post('/employer/profile')
                    .set({ "Authorization": `Bearer ${res.body.jwt}` })
                //assert
                profileRes.should.have.status(200)
            })

        })

        it("should not sign in with non existing email", async () => {
            //act
            const res = await chai.request(server)
                .post('/employer/auth/signin')
                .send({ email: "nonExisting@email.com", password: "any" })
            //console.log("non existing amail res", res.body)
            //Assert
            res.should.have.status(400)
            res.body.should.have.property("message").eql("Authentication failed")
        })


    })

    describe("Profile routes", async () => {
        let newEmployerReq = { name: 'TEST EMPLOYER', email: 'employer@email.com', password: 'test' }
        before(async () => {
            await Employer.remove({}) //empty employers collection
            newEmployer = await employerHelper.registerEmployer(newEmployerReq)  //only one recored exists in employers collection
        })

        it("should be able to update profile", async () => {
            const updatedProfile = { phone: "0142678398", address: "updated address" }
            //act
            const res = await chai.request(server)
                .put('/employer/profile')
                .set({ "Authorization": `Bearer ${newEmployer.jwt}` })
                .send(updatedProfile)
            //assert
            res.body.should.have.property("phone").eql(updatedProfile.phone)
            res.body.should.have.property("phone").eql(updatedProfile.phone)
            res.body.should.have.property("address").eql(updatedProfile.address)
            res.body.should.have.property("_id")

        })

        it("should be able to get profile", async () => {
            //act
            const res = await chai.request(server)
                .get('/employer/profile')
                .set({ "Authorization": `Bearer ${newEmployer.jwt}` })
            //assert

            res.should.have.status(200)
        })

        it("should not ne able to get profile without signing in", async () => {
            const res = await chai.request(server)
                //act
                .get('/employer/profile')
            //assert
            //console.log("profile res", res.body)
            res.should.have.status(401)
        })
    })

    describe("employer accepts a job application route", async () => {
        let ownerEmployer
        let applicantSeeker
        let job
        let application
        beforeEach(async () => {
            await Employer.remove({}) //empty employers collection
            await Seeker.remove({}) //empty employers collection
            await Job.remove({}) //empty employers collection
            await Application.remove({}) //empty employers collection
            ownerEmployer = await employerHelper.registerEmployer({ name: 'TEST ownerEmployer', email: 'ownerEmployer@email.com', password: 'test' })

            applicantSeeker = await seekerHelper.registerSeeker({ name: 'TEST JOB SEEKER', email: 'applicantSeeker@email.com', password: 'test' })

            job = await jobHelper.createJob({ 
                title: "New Job",
                location: "brisbane",
                minPay: "70000",
                description: "any description",
             jwt: ownerEmployer.jwt })
         application=await seekerHelper.applyForApplication({job: job._id , employer: job.employer,jwt: applicantSeeker.jwt})           
    })
    it("employer can accept a submitted application for interview by application id", async () => {
        //act
        const res = await chai.request(server)
                .post('/employer/empaccept/'+application._id)
                .set({ "Authorization": `Bearer ${ownerEmployer.jwt}` })
        //assert
            // console.log("accept res ", res.body)
         res.should.have.status(200)
         res.body.should.have.property("employer")
         res.body.employer.should.have.property("_id").eql(job.employer)
         res.body.seeker.should.have.property("_id")
         res.body.job.should.have.property("_id").eql(job._id)
         res.body.should.have.property("currentStage").eql("APPROVED_FOR_INTERVIEW")

    })
})
})


