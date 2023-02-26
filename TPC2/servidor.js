// Pedido localhost:7777/<id_cidade>
// Ler url
// Ler ficheiro -> escrever na resposta


var http = require('http'); 
var url = require('url');
var fs = require('fs');
// Sem ./ seria importado da diretoria de inst do node js

var myServer = http.createServer(function (req, res) { 
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); // 2 configs no cabeçalho (código 200 e content-type (inclui charset))

    var q = url.parse(req.url, true) // Parse (true - dá como resultado um dicionário, false - ...)
    console.log("ola");

    res.end(); // Fechar o pacote (só pode ser fechado uma vez - apenas deve ser usado uma vez)
})

myServer.listen(7777)

console.log('Servidor à escuta na porta 7777...')