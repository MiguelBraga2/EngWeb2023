var http = require('http')
var axios = require('axios')
var mypages = require('./mypages')
var fs = require('fs')

function sexDistribution(pessoas) {
    var d = {}

    for(let i=0; i < pessoas.length; i++){
        var pessoa = pessoas[i]
        d[pessoa.sexo] = (d[pessoa.sexo] || 0) + 1
    }

    return d
}

function sportDistribution(pessoas) {
    var d = {}

    for(let i=0; i < pessoas.length; i++){
        var pessoa = pessoas[i]
        for (let j=0; j < pessoa.desportos.length; j++){
            d[pessoa.desportos[j]] = (d[pessoa.desportos[j]] || 0) + 1
        }
        
    }

    return d
}

function compareEntries(a, b) {
    return b[1] - a[1]
}

http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16) // Data para ser colocada no footer
    console.log(req.method + " " + req.url + " " + d) // Método + url do pedido HTTP

    if (req.url == "/"){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.end(mypages.genIndex())
    }

    else if(req.url == '/pessoas'){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(mypages.genMainPage(pessoas, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url == '/pessoasOrdenadas'){
        axios.get('http://localhost:3000/pessoas?_sort=nome')
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(mypages.genMainPage(pessoas, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url.match(/\/pessoas\/p\d+/)){
        console.log('Pedindo ' + req.url.substring(9))
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
            .then(function(resp){
                var pessoa = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(mypages.genPersonPage(pessoa, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url.match(/w3\.css$/)){
        fs.readFile("w3.css", function(erro, dados){
            if(erro){
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na leitura do ficheiro: ' + erro + '</p>')
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/css'})
                res.end(dados)
            }
        })
    }
    else if (req.url == '/sexo'){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                var dist = sexDistribution(pessoas)
                console.log(Object.keys(dist))
                res.end(mypages.genDistributionPage(dist, d, "sexo", Object.keys(dist)))
                //console.log(d)
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url == '/desporto'){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                var dist = sportDistribution(pessoas)
                var entries = Object.entries(dist)
                entries.sort(compareEntries)
                console.log(entries.map(e => e[0]))
                res.end(mypages.genDistributionPage(dist, d, "desporto", entries.map(e => e[0])))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end('<p>Operação não suportada: ' + req.url + '</p>')
    }
}).listen(7777)

console.log('Servidor à  escuta na porta 7777...')
