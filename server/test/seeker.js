let mongoose = require("mongoose");
let Seeker = require('../models/seeker');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
