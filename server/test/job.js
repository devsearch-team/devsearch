let mongoose = require("mongoose");
let Job = require('../models/job');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp)

// chai.use(chaiHttp);
// let defaultUser = {
//     name: "admin",
//     password: "admin@123"
//   };
  
//   let token;
let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpZCI6IjYxMDBkNGZiYTJjZDQ5NzdlOTdhZWY4NyIsImlhdCI6MTYyNzgyMDc4Nn0.lvaGADnD4RnwmL5rYgjGGr_IWHDXnmijJhd-st_XKxA"
//parent block
describe('Jobs', () => {

    // beforeEach(done => {
    //     chai
    //       .request(app)
    //       .post("/users")
    //       .send(defaultUser)
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         done();
    //       });
    //   }) 

    beforeEach((done) => { //Before each test we empty the database
        Job.remove({}, (err) => {
           done()
        });
    });
/*
  * Test the /GET route
  */
  describe('/GET job', () => {
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
    it('it should not POST a job when employer is signed in', (done) => {
        let job = {
            title: "New Job",
            location: "brisbane",
            minPay: "70000",
            description: "any description"
        }
          chai.request(server)
          .post('/jobs')
          .set({ "Authorization": `Bearer ${token}` })
          .send(job)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('employer');               
                res.body.should.have.property('title');
                res.body.should.have.property('location');
                res.body.should.have.property('minPay');
                res.body.should.have.property('description');
                res.body.should.have.property('created_at');
                res.body.should.have.property('modified_at');
            done();
          });
    });
    it('it should not POST a job without employer signed in', (done) => {
        let job = {
            location: "brisbane",
            minPay: "70000",
            decription: "any description"
        }
          chai.request(server)
          .post('/jobs')
          .send(job)
          .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Unauthorized operation');
            done();
          });
    });
    it('it should not POST a job without a title field', (done) => {
        let job = {
            location: "brisbane",
            minPay: "70000",
            decription: "any description"
        }
          chai.request(server)
          .post('/jobs')
          .set({ "Authorization": `Bearer ${token}` })
          .send(job)
          .end((err, res) => {
                res.should.have.status(500)
                res.body.should.be.a('object')
                res.body.should.have.property('error')
            done()
          })
    })
})

/*
  * Test the /GET/:id route
  */
describe('/GET/:id job', () => {
    it('it should GET a job by the given id', (done) => {
        let job = new Job({ title: "new position", description: "new description", minPay: "40000",created_at: new Date()});
        job.save((err, job) => {
            chai.request(server)
          .get('/jobs/' + job.id)
          .send(job)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('description');
                res.body.should.have.property('minPay');
                res.body.should.have.property('created_at');
                res.body.should.have.property('_id').eql(job.id);
            done();
          });
        });
          
    });
    it('it should Not GET a job by non existing id', (done) => {
        let job = new Job({ title: "new position", description: "new description", minPay: "40000",created_at: new Date()});
        job.save((err, job) => {
            chai.request(server)
          .get('/jobs/' + 100)
          .send(job)
          .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('error')
            done();
          });
        });
          
    });
});
 /*
  * Test the /PUT/:id route
  */
 describe('/PUT/:id job', () => {
    it('it should UPDATE a job given the id', (done) => {
        let job = new Job({title: "The Chronicles of Narnia", })
        job.save((err, job) => {
              chai.request(server)
              .put('/job/' + job.id)
              .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
              .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql('Book updated!')
                    res.body.book.should.have.property('year').eql(1950)
                done()
              })
        })
    })

});

})
