var express = require('express');
var router = express.Router();
const fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RM-RN' });
});

router.post("/", function (req, res, next) {
 //res.status = 200;

  var reqBody = "";
  req.on('data', (chunk) => {
    reqBody += chunk;
  });

  req.on("end", function () {
    console.log("SRC ", reqBody);
    var result = reqBody.replace(/[\r\n]+/g, ' ');
    console.log("RES ", result);
    res.end(result);
  });
  
});

module.exports = router;
