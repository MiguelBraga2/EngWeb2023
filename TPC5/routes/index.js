var express = require('express');
var router = express.Router();
var Task = require('../controllers/task')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.getTasks()
  .then(resp => {
    res.render('index', {tasks: resp, date: data});
  })
  .catch(erro => {
    console.log('erro')
  })
});

/* Task form submit*/
router.post('/', function(req, res) {
  var data = new Date().toISOString().substring(0, 16)
  Task.addTask(req.body)
  .then(resp => {
    res.redirect('/')
  })
  .catch(erro => {
    console.log('erro')
  })
})

module.exports = router;
