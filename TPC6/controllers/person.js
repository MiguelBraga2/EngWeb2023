var Person = require('../models/person')

module.exports.list = () => {
    return Person
                .find()
                .sort({nome: 1})
                .then(resposta => {
                    return resposta
                })
                .catch(erro => {
                    return erro
                })
}

module.exports.addPerson = person => {
    return Person.create(person)
                .then(resposta => {
                    return resposta
                })
                .catch(erro => {
                    return erro
                })
}