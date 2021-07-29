var express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({hello:"world"});
});

router.get('/2', function(req, res, next) {
  res.json({hello:"world war II"});
});
module.exports = router;
