var express = require('express');
var router = express.Router();
var env = require('../config/env')
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0,19)
  axios.get(env.apiAccessPoint+"/emd")
  .then(response => {
    res.render('index', { list:  response.data, d: data});
  })
  .catch(error => {
    res.render('error', {error: err})
  })
});

router.get('/:id', function(req, res){
  var data = new Date().toISOString().substring(0,19)
  axios.get(env.apiAccessPoint+"/emd/" + req.params.id)
  .then(response => {
    res.render('page', { exame:  response.data, d: data});
  })
  .catch(error => {
    res.render('error', {error: err})
  })
})

module.exports = router;
