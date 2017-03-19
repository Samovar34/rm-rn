var express = require('express');
var router = express.Router();
const fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RM-RN' });
});

// обработка строки
router.post("/", function (req, res, next) {
 //res.status = 200;

  var reqBody = "";

  // извлечь данные
  req.on('data', (chunk) => {
    reqBody += chunk;
  });

  // как только все прочитано, обработать и ответить
  req.on("end", function () {
    res.setHeader("Content-Type", "text/plain,charset=UTF-8")
    var result = reqBody.replace(/[\r\n]+/g, ' ');
    res.end(result);
  });

  req.on("error", function (err) {
    next(err);
  });
  
});

module.exports = router;
