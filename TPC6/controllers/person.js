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

module.exports.deletePerson = id => {
    return Person.deleteOne({_id: id})
                .then(resposta => {
                    return resposta
                })
                .catch(erro => {
                    return erro
                })
}

module.exports.updatePerson = person => {
    return Person.updateOne({_id: person.id}, person)
                .then(resposta => {
                    return resposta
                })
                .catch(erro => {
                    return erro
                })
}

