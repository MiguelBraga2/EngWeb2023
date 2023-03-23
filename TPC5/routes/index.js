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

router.get('/submit/:taskId', function(req, res){
  var data = new Date().toISOString().substring(0, 16)
  Task.getTask(req.params.taskId)
  .then(resp => {
    resp["done"] = "1"
    Task.updateTask(resp)
    .then(resp => {
      res.redirect('/')
    })
    .catch(erro => {
      console.log('erro')
    })
  })
  .catch(erro => {
    console.log('erro')
  })
})

router.get('/undo/:taskId', function(req, res){
  var data = new Date().toISOString().substring(0, 16)
  Task.getTask(req.params.taskId)
  .then(resp => {
    resp["done"] = "0"
    Task.updateTask(resp)
    .then(resp => {
      res.redirect('/')
    })
    .catch(erro => {
      console.log('erro')
    })
  })
  .catch(erro => {
    console.log('erro')
  })
})

router.get('/delete/:taskId', function(req, res){
  var data = new Date().toISOString().substring(0, 16)
  Task.deleteTask(req.params.taskId)
  .then(resp => {
    res.redirect('/')
  })
  .catch(erro => {
    console.log('erro')
  })
})

router.get('/edit/:taskId', function(req, res){
  var data = new Date().toISOString().substring(0, 16)
  Task.getTasks()
  .then(resp => {
    Task.getTask(req.params.taskId)
    .then(t => {
      res.render('editPage', {tasks: resp, date: data, task: t})
    })
    .catch(erro => {
      console.log('erro')
    })
  })
  .catch(erro => {
    console.log('erro')
  })
})

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

router.post('/edit/:taskId', function(req, res) {
  var data = new Date().toISOString().substring(0, 16)
  console.log(req.body)
  Task.updateTask(req.body)
  .then(resp => {
    res.redirect('/')
  })
  .catch(erro => {
    console.log('erro')
  })
})



module.exports = router;
