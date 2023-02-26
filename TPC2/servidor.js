// Pedido localhost:7777/<id_cidade>
// Ler url
// Ler ficheiro -> escrever na resposta


var http = require('http'); 
var url = require('url');
var fs = require('fs');
// Sem ./ seria importado da diretoria de inst do node js

var myServer = http.createServer(function (req, res) { 
    var q = url.parse(req.url, true) // Parse (true - dá como resultado um dicionário, false - ...)
    var regex = new RegExp("/c?[0-9]*$")
    if (q.pathname == "/"){
        fs.readFile('index.html', function(err,data) { // Callback anonymous function; params: err - , data - informação do ficheiro
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); // 2 configs no cabeçalho (código 200 e content-type (inclui charset))
            if (err){ // Se houve erros
                res.write("ERRO: na leitura do ficheiro :: " + err) // Err é uma mensagem de erro
            }
            else {
                res.write(data)
            }
            res.end(); // Fechar o pacote (só pode ser fechado uma vez - apenas deve ser usado uma vez)
            // Pacote é enviado a seguir ao res.end)
        })
    }
    else if (regex.test(q.pathname)){
        fs.readFile('cidades' + q.pathname + '.html', function(err,data) { // Callback anonymous function; params: err - , data - informação do ficheiro
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); // 2 configs no cabeçalho (código 200 e content-type (inclui charset))
            if (err){ // Se houve erros
                res.write("ERRO: na leitura do ficheiro :: " + err) // Err é uma mensagem de erro
            }
            else {
                res.write(data)
            }
            res.end(); // Fechar o pacote (só pode ser fechado uma vez - apenas deve ser usado uma vez)
            // Pacote é enviado a seguir ao res.end)
        })
    }
    else {
        console.log("Regex not matched")
    }
})

myServer.listen(7777)

console.log('Servidor à escuta na porta 7777...')