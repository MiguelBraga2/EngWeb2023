var axios = require('axios')

// Get a list of all the tasks in the db
module.exports.getTasks = () => {
    return axios.get('http://localhost:3000/tasks')
    .then(resp => {
        return resp.data
    })
    .catch(erro => {
        return erro 
    })
}

module.exports.addTask = (task) => {
    return axios.post('http://localhost:3000/tasks', task)
    .then(resp => {
        return resp.data
    })
    .catch(erro => {
        return erro
    })
}