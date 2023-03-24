var http = require('http')
var templates = require('./templates')
var axios = require('axios')
var fs = require('fs')
const { parse } = require('querystring');
const { url } = require('inspector');

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}


var tasks_server = http.createServer((req, res) => {
    // Logging
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    switch(req.method){
        case 'GET':
            if (req.url == "/"){
                axios.get("http://localhost:3000/tasks")
                    .then(resp => {
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                        res.end(templates.mainPage(resp.data, d))
                    })
                    .catch(erro => {
                        res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                        res.end("<p>Não foi possível obter a lista de tasks... Erro: " + erro)
                    })
                
            }
            else if (req.url == "/w3.css" || req.url == "/edit/w3.css"){
                fs.readFile('w3.css', (err, data) => {
                    if (err){
                        res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                        res.end("<p>Não foi possível ler o ficheiro w3.css... Erro: " + erro)
                    }
                    else {
                        res.writeHead(200, {'Content-type': 'text/css'})
                        res.end(data)
                    }
                })
            }
            // Edit task
            else if (/\/edit\/[0-9]+$/i.test(req.url)){
                var id = req.url.substring(6)
                console.log(id)
                axios.get('http://localhost:3000/tasks')
                    .then(resp => {
                        var tasks = resp.data
                        for(let i=0; i<tasks.length; i++){
                            if (tasks[i].id == id){
                                var task = tasks[i]
                            }
                        }
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                        res.end(templates.editTaskPage(tasks, task, d))
                    })


            }
            // Submit task
            else if (/\/submit\/[0-9]+$/i.test(req.url)){
                var id = req.url.substring(8)
                axios.get('http://localhost:3000/tasks/' + id)
                .then(resp => {
                    var task = resp.data
                    task.done = '1'
                    axios.put('http://localhost:3000/tasks/' + id, task)
                    .then(resp => {
                        axios.get("http://localhost:3000/tasks")
                        .then(resp => {
                            res.writeHead(302, {'Content-Type': 'text/html;charset=utf-8', 'Location' : '/'});
                            res.end(templates.mainPage(resp.data, d))
                        })
                        .catch(erro => {
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end("<p>Não foi possível obter a lista de tasks... Erro: " + erro)
                        })
                    })
                })

            }
            // Delete task
            else if (/\/delete\/[0-9]+$/i.test(req.url)){
                var id = req.url.substring(8)
                axios.delete('http://localhost:3000/tasks/' + id)
                .then(resp => {
                    console.log("Delete " + id + " :: " + resp.status);
                    axios.get("http://localhost:3000/tasks")
                        .then(resp => {
                            res.writeHead(302, {'Content-Type': 'text/html;charset=utf-8', 'Location' : '/'});
                            res.end(templates.mainPage(resp.data, d))
                        })
                        .catch(erro => {
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end("<p>Não foi possível obter a lista de tasks... Erro: " + erro)
                        })
                }).catch(error => {
                    console.log('Erro: ' + error);
                    res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                    res.end('<p>Erro a apagar task:' + id  + '</p>')
                })
            }
            // Undo task
            else if (/\/undo\/[0-9]+$/i.test(req.url)){
                var id = req.url.substring(6)
                console.log(id)
                axios.get('http://localhost:3000/tasks/' + id)
                .then(resp => {
                    var task = resp.data
                    task.done = '0'
                    axios.put('http://localhost:3000/tasks/' + id, task)
                    .then(resp => {
                        axios.get("http://localhost:3000/tasks")
                        .then(resp => {
                            res.writeHead(302, {'Content-Type': 'text/html;charset=utf-8', 'Location' : '/'});
                            res.end(templates.mainPage(resp.data, d))
                        })
                        .catch(erro => {
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end("<p>Não foi possível obter a lista de tasks... Erro: " + erro)
                        })
                    })
                })
            }

            break;
        case 'POST':
            if (req.url == "/"){
                collectRequestBodyData(req, result => {
                    if (result) {
                        axios.post('http://localhost:3000/tasks', result)
                        .then(resp => {
                            console.log("Registo inserido: " + JSON.stringify(resp.data));
                            axios.get("http://localhost:3000/tasks")
                            .then(resp => {
                                console.log(resp.data)
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                                res.end(templates.mainPage(resp.data, d))
                            })
                            .catch(erro => {
                                res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                                res.end("<p>Não foi possível obter a lista de tasks... Erro: " + erro)
                            })
                        })
                        .catch(error => {
                            console.log('ERROR: ' + error);
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                        res.end("<p>Unable to add date to JSON file...</p>")
                        })
                    }
                    else {
                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                        res.end("<p>Unable to collect data from body...</p>")
                    }
                })
            }
            else if (/\/edit\/[0-9]+$/i.test(req.url)){
                var id = req.url.substring(6)
                collectRequestBodyData(req, result => {
                    if (result) {
                        axios.put('http://localhost:3000/tasks/' + id, result)
                        .then(resp => {
                            axios.get("http://localhost:3000/tasks")
                            .then(resp => {
                                res.writeHead(302, {'Content-Type': 'text/html;charset=utf-8', 'Location' : '/'});
                                res.end(templates.mainPage(resp.data, d))
                            })
                            .catch(erro => {
                                res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                                res.end("<p>Não foi possível obter a lista de tasks... Erro: " + erro)
                            })
                        })
                    }
                    else {
                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                        res.end("<p>Unable to collect data from body...</p>")
                    }
                })
            }
            break;
    }

})

tasks_server.listen(7777, () => {
    console.log("Servidor à escuta na porta 7777")
})