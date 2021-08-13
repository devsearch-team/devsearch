const { createDb, dropDb } = require('./helpers/dbHelper')
let Employer = require('../models/employer');
let Job = require('../models/job')
let Seeker = require('../models/seeker')
let Application = require('../models/application')

const server = require("../app");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const { expect } = require('chai');
chai.use(chaiHttp)
let should = chai.should();
const { seekerHelper, employerHelper, jobHelper } = require('./helpers/common')





describe("Seeker", async () => {

    before(async () => {
        await createDb()
    })

    after(async () => {
        await dropDb();
    })

    describe("Register routes", async () => {
        const newSeeker = {
            name: "new seeker",
            email: "seeker@mail.com",
            password: "123abc"
        }
        it("should register an seeker", async () => {
            //ACT
            const res = await seekerHelper.registerSeeker(newSeeker)
            console.log("register seeker res", res)
            //Assert
            res.should.have.status(200)
            res.should.have.property('jwt')
            res.should.have.property('username').eql(newSeeker.name)

            it("should access profile using returned jwt after register", async () => {
                //Act
                const profileRes = await chai.request(server)
                    .post('/seeker/profile')
                    .set({ "Authorization": `Bearer ${res.jwt}` })
                //assert
                profileRes.should.have.status(200)
            })
        })
    })

    describe("Sign in route", async () => {
        let newSeeker = { name: 'TEST SEEKER', email: 'seeker@email.com', password: 'test' }
        before(async () => {
            await Seeker.remove({}) //empty employers collection
            await seekerHelper.registerSeeker(newSeeker)  //only one recored exists in employers collection
        })

        it("should sign in a seeker", async () => {
            //Act
            //console.log("testEmployer",testEmployer)
            const res = await chai.request(server)
                .post('/seeker/auth/signin')
                .send({ email: newSeeker.email, password: newSeeker.password })

            //Assert
            res.should.have.status(200)
            res.body.should.have.property('jwt')
            res.body.should.have.property('username').eql(newSeeker.name)

            it("should access profile using returned jwt after sign in", async () => {
                //Act
                const profileRes = await chai.request(server)
                    .post('/seeker/profile')
                    .set({ "Authorization": `Bearer ${res.body.jwt}` })
                //assert
                profileRes.should.have.status(200)
            })

        })

        it("should not sign in with non existing email", async () => {
            //act
            const res = await chai.request(server)
                .post('/seeker/auth/signin')
                .send({ email: "nonExisting@email.com", password: "any" })
            //console.log("non existing amail res", res.body)
            //Assert
            res.should.have.status(400)
            res.body.should.have.property("message").eql("Authentication failed")
        })


    })

    describe("Profile routes", async () => {

        let newSeekerReq = { name: 'TEST SEEKER', email: 'seeker@email.com', password: 'test' }

        before(async () => {
            await Seeker.remove({}) //empty seekers collection
            newSeeker = await seekerHelper.registerSeeker(newSeekerReq)  //only one recored exists in seekers collection
        })

        it("should be able to update profile", async () => {
            const updatedProfile = { about: "updated about", phone: "041237578" }
            //act
            const res = await chai.request(server)
                .put('/seeker/profile')
                .set({ "Authorization": `Bearer ${newSeeker.jwt}` })
                .send(updatedProfile)
            //assert
            res.body.should.have.property("phone").eql(updatedProfile.phone)
            res.body.should.have.property("phone").eql(updatedProfile.phone)
            res.body.should.have.property("about").eql(updatedProfile.about)
            res.body.should.have.property("_id")

        })

        it("should be able to get profile", async () => {
            //act
            const res = await chai.request(server)
                .get('/seeker/profile')
                .set({ "Authorization": `Bearer ${newSeeker.jwt}` })
            //assert
            // console.log("profile res", res.body)

            res.should.have.status(200)
        })

        it("should not be able to get profile without signing in", async () => {
            //act
            const res = await chai.request(server)
                .get('/seeker/profile')
            //assert
            res.should.have.status(401)
        })
    })

    describe("Seeker creates application route", async () => {
        let ownerEmployer
        let applicantSeeker
        let job
        before(async () => {
            ownerEmployer = await employerHelper.registerEmployer({ name: 'TEST ownerEmployer', email: 'ownerEmployer@email.com', password: 'test' })

            applicantSeeker = await seekerHelper.registerSeeker({ name: 'TEST JOB SEEKER', email: 'applicantSeeker@email.com', password: 'test' })

            job = await jobHelper.createJob({
                title: "New Job",
                location: "brisbane",
                minPay: "70000",
                description: "any description",
                jwt: ownerEmployer.jwt
            })
        })

        it("Seeker should be able to apply for a job", async () => {
            //act
            let applicationRes = await seekerHelper.applyForApplication({ job: job._id, employer: job.employer, jwt: applicantSeeker.jwt })
            //assert
            applicationRes.should.have.status(200)
            applicationRes.should.have.property("currentStage").eql("SUBMITTED")
            applicationRes.should.have.property("employer").eql(job.employer)
            applicationRes.should.have.property("seeker")
            applicationRes.should.have.property("job").eql(`${job._id}`)


            it("Seeker can get all applications that belongs to him", async () => {
                //given 
                let secondApplicantSeeker = await seekerHelper.registerSeeker({ name: 'TEST JOB SEEKER', email: 'applicantSeeker@email.com', password: 'test' })
                let secondSeekrApplication = await seekerHelper.applyForApplication({ job: job._id, employer: job.employer, jwt: secondApplicantSeeker.jwt })
                //act
                let res = await chai.request(server)
                    .get('/seeker/applications')
                    .set({ "Authorization": `Bearer ${secondApplicantSeeker.jwt}` })
                //assert
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(1)
                res.body[0]._id.should.be.eql(secondSeekrApplication._id)
                    // console.log("applications list", res.body)

            })
        })
    })

})


