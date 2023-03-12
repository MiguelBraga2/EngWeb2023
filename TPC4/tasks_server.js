var http = require('http')
var fs = require('fs')
var templates = require('./templates.js')
var axios = require('axios')

const { parse } = require('querystring');

// Aux functions
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

var tasks_server = http.createServer(function (req, res){
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    switch (req.method){
        case "GET":
            if (req.url == '/'){
                console.log(req.url)
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.end(templates.genMainPage())
            }
            else if (req.url == "/w3.css"){
                fs.readFile('./w3.css', function(err, data){
                    if (err){
                        res.writeHead(404, {'Content-type': 'text/html; charset=utf-8'})
                        res.end("ERRO: na leitura do ficheiro w3.css :: " + err)
                    }
                    else {
                        res.writeHead(200, {'Content-type': 'text/css; charset=utf-8'})
                        res.end(data)
                    }
                })
            }
            break
        case "POST":
            if (req.url == "/"){
                collectRequestBodyData(req, result => {
                    if (result){
                        axios.post('http://localhost:3000/tasks', result)
                        .then(resp => {
                            console.log(resp)
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end('<p>Registo inserido:' + JSON.stringify(resp.data) + ' </p>')
                        })
                        .catch(error => {
                            console.log('Erro: ' + error);
                            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end("<p>Unable to insert record ...</p>")
                        })
                    }
                    else {
                        res.writeHead(400, {'Content-Type': 'text/html;charset=utf-8'})
                        res.end('<p>Unable to collect data from body...</p>')
                    }
                })
            }
    }

    
})

tasks_server.listen(7777, () => {
    console.log('Listening on port 7777')
})
