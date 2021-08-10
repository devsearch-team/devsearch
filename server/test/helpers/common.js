const server = require('../../app');
let chai = require('chai');

const registerEmployer = async function ({ name, email, password }) {

    const employerRes = await chai.request(server)
        .post("/employer/auth/register")
        .type('json')
        .send({
            name: name,
            email: email,
            password: password
        })

    return { status: employerRes.status, ...employerRes.body };
}


const createJob = async function ({ title, location, maxPay, minPay, description, jwt }) {

    const req = chai.request(server)
      .post("/jobs")
      .type('json')
      .send({
        title: title,
        location: location,
        maxPay: maxPay,
        minPay: minPay,
        description: description
      });
  
    if (jwt) {
      req.set({ "Authorization": `Bearer ${jwt}` })
    }
  
    const res = await req;
    return { status: res.status, ...res.body };
}

const registerSeeker = async function({name, email, password}){

    const seekerRes = await  chai.request(server)
   .post("/seeker/auth/register")
   .type('json')
   .send({
       name: name,
       email: email,
       password: password
   })

   return {status: seekerRes.status, ...seekerRes.body};
}

const applyForApplication=async function({employer,job,jwt}){
   const applicationRes = await  chai.request(server)
   .post("/seeker/applications")
   .type('json')
   .send({
       employer,
       job
   })
   .set({ "Authorization": `Bearer ${jwt}` })

   return {status: applicationRes.status, ...applicationRes.body};
}

module.exports = { 
    employerHelper: {registerEmployer},
    jobHelper: {createJob},
    seekerHelper : {
        registerSeeker,
        applyForApplication
    }
} 