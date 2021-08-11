const { createDb, dropDb } = require('./helpers/dbHelper')
let Job = require('../models/job');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const server = require('../app');
let should = chai.should();
let expect = chai.expect;
const { seekerHelper, employerHelper, jobHelper } = require('./helpers/common')


chai.use(chaiHttp)

//parent block



describe('Jobs', async () => {
  let employer
  let noPermissionEmployer
  let seeker
  console.log("job test started");

  before(async () => {
    await createDb()
    console.log('db created');
    //console.log("inside employer dbCon",dbCon)

    employer = await employerHelper.registerEmployer({ name: 'TEST EMPLOYER', email: 'employer@email.com', password: 'test' })
    noPermissionEmployer = await employerHelper.registerEmployer({ name: 'NO PERMISSION', email: 'employer2@email.com', password: 'test2' })
    seeker = await seekerHelper.registerSeeker({ name: 'TEST JOB SEEKER', email: 'seeker@email.com', password: 'test' });

  })

  after(async () => {
    await dropDb();
  })

  /*
     * Test the /GET route
     */
  describe('/GET job', () => {
    before(async () => { //Before test we empty the database
      await Job.remove({})
    })
    it('it should GET all the jobs', (done) => {
      chai.request(server)
        .get('/jobs')
        .end((err, res) => {
          res.should.have.status(200)
          Object.keys(res.body).length.should.be.eql(2)
          res.body.jobs.should.be.a('array')
          res.body.jobs.length.should.be.eql(0)
          res.body.totalPages.should.be.eql(0)
          done()
        })
    })
  })

  /*
   * Test the /POST route
   */
  describe('/POST job', () => {

    const job = {
      title: "New Job",
      location: "brisbane",
      minPay: "70000",
      description: "any description"
    }

    it('it should POST a job when employer is signed in', async () => {

      //Act
      const { status, title, location, minPay, description } = await jobHelper.createJob({ ...job, jwt: employer.jwt });

      //Assert
      status.should.eq(200)
      expect({ title, location, minPay, description }).to.be.deep.equal(job)

    });

    it('it should not POST a job with employeer not signed in', async () => {

      //Act
      const { status, error } = await jobHelper.createJob({ ...job });

      //Assert
      status.should.eq(401)

    });
    it('it should not POST a job with seeker signed in', async () => {

      //Act
      const { status } = await jobHelper.createJob({ ...job, jwt: seeker.jwt });

      //Assert
      status.should.eq(403)

    });

    it('it should not POST a job without a title field', async () => {
      let jobWithoutATile = {
        location: "brisbane",
        minPay: "70000",
        decription: "any description"
      }
      //Act
      const { status, error } = await jobHelper.createJob({ ...jobWithoutATile, jwt: employer.jwt });
      console.log("job error",error)
      //Assert
      status.should.eq(500)
    })
  })

  /*
    * Test the /GET/:id route
    */
  describe('/GET/:id job', () => {
    let newJob

    before(async () => {
      newJob = await jobHelper.createJob({ title: "new position", description: "new description", minPay: "60000", maxPay: "85000", jwt: employer.jwt })
    })

    it('it should GET a job by the given id', async () => {

      //Act
      const { body, status } = await chai.request(server)
        .get('/jobs/' + newJob._id)
        .send(newJob)

      //Assert
      status.should.eq(200);
      body.should.be.a('object');
      body.should.have.property('title').eql(newJob.title);
      body.should.have.property('description').eql(newJob.description);
      body.should.have.property('minPay').eql(newJob.minPay);
      body.should.have.property('maxPay').eql(newJob.maxPay);
      body.should.have.property('created_at');
      body.should.have.property('_id').eql(newJob._id);
    });

    it('it should Not GET a job by non existing id', async () => {

      //Act
      const { body, status } = await chai.request(server)
        .get('/jobs/' + 100);


      //Assert
      status.should.eq(404);
      body.should.be.a('object');
      body.should.have.property('error')

    });
  });
  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id job', () => {
    let existingJob
    let updatedJob
    before(async () => {
      existingJob = await jobHelper.createJob({ title: "new position", description: "new description", minPay: "60000", maxPay: "85000", jwt: employer.jwt })
      updatedJob={ title: "updated position", minPay: "90000", maxPay: "100000" }
    })
    it('it should UPDATE a job given the id', async () => {

      //Act
      const { body,status } = await chai.request(server)
        .put('/jobs/' + existingJob._id)
        .send(updatedJob)
        .set({ "Authorization": `Bearer ${employer.jwt}` })
       // console.log("body of update res is ",body)

      //Assert
      status.should.eq(200)
      body.should.be.a('object')
      body.should.have.property('title').eql(updatedJob.title)
      body.should.have.property('minPay').eql(updatedJob.minPay)
      body.should.have.property('maxPay').eql(updatedJob.maxPay)

    })

    it('it should not UPDATE a job belonging to another employer', async () => {

      //act
      const { body, status } = await chai.request(server)
        .put('/jobs/' + existingJob._id)
        .set({ "Authorization": `Bearer ${noPermissionEmployer.jwt}` })
        .send({ title: "updated position", minPay: "90000", maxPay: "100000" });

      //assert
      status.should.eq(404)
      body.should.be.a('object')
      body.should.have.property('error').eql('Record not found')
    })
  });
});
