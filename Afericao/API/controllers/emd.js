var Exame = require('../models/emd')

// Exame list
module.exports.list = () => {
    return Exame
            .find({}, {id: 1, nome: 1, data: 1, resultado: 1})
            .sort({dataEMD:-1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.listAll = () => {
    return Exame
            .find({}, {})
            .sort({dataEMD:-1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getExame = id => {
    return Exame.findOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addExame = e => {
    return Exame.create(e)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateExame = e => {
    return Exame.updateOne({_id:e._id}, e)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteExame = id => {
    return Exame.deleteOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getModalidades = () => {
    return Exame.distinct('modalidade')
            .sort()
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getAptos = () => {
    return Exame.find({resultado: true})
            .sort()
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getFeminino = () => {
    return Exame.find({género: 'F'}, {nome: 1, género: 1})
    .sort({nome: 1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.doClube = (clube) => {
    return Exame.find({clube: clube})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.daModalidade = (modalidade) => {
    return Exame.find({modalidade: modalidade})
    .then(resposta => {
        return resposta
    })
    .catch(erro => {
        return erro
    })
}