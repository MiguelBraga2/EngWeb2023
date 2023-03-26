var express = require('express');
var router = express.Router();
var Person = require('../controllers/person')

/* GET home page. */
router.get('/persons', function(req, res, next) {
  Person.list()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de pessoas."}))
});

router.post('/persons', (req, res) => {
  Person.addPerson(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(521).json({erro: erro, mensagem: "Não consegui inserir o exame."}))
})

module.exports = router;
