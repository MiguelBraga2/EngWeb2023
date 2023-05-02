var express = require('express');
var router = express.Router();
var Exame = require('../controllers/emd')


router.get('/api/emd', (req,res) => {
  if (req.query.res == 'OK'){
    Exame.getAptos()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro: erro, mensagem: "Não consegui obter o exame."}))
  }
  else if (req.query.modalidade){
    Exame.daModalidade(req.query.modalidade)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro: erro, mensagem: "Não consegui obter o exame."}))
  }
  else {
    Exame.list()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."}))
  }
})

router.get('/api/emds', (req, res) => {
  Exame.listAll()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."}))
})

router.get('/api/emd/:id', (req,res) => {
  Exame.getExame(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro: erro, mensagem: "Não consegui obter o exame."}))
})

router.get('/api/modalidades', (req,res) => {
  Exame.getModalidades()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro: erro, mensagem: "Não consegui obter o exame."}))
})

// TODO

router.get('/api/atletas', (req,res) => {
  if (req.query.gen == 'F'){
    Exame.getFeminino()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro: erro, mensagem: "Não consegui obter o exame."}))
  }
  else if (req.query.clube){
    Exame.doClube(req.params.clube)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro: erro, mensagem: "Não consegui obter o exame."}))
  }
  
})

module.exports = router;
