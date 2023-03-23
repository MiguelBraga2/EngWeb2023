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

module.exports.getTask = (id) => {
    return axios.get('http://localhost:3000/tasks/' + id)
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

module.exports.updateTask = (task) => {
    return axios.put('http://localhost:3000/tasks/' + task.id, task)
    .then(resp => {
        return resp.data
    })
    .catch(erro => {
        return erro
    })
}

module.exports.deleteTask = (id) => {
    return axios.delete('http://localhost:3000/tasks/' + id)
    .then(resp => {
        return resp.data
    })
    .catch(erro => {
        return erro
    })
}