/*
    Module Static - to serve static resources in public folder
    Exports: 
        Bool staticResource(request) - tells if someone is asking a static resource
        Data serveStaticResource(req, res) - returns the resource
*/

var fs = require('fs')

// Testa se é um pedido de um recurso estático (regex)
function staticResource(request, static_resource_list){
    for(let i = 0; i < static_resource_list.length; i++){
        if (request.url == "/" + static_resource_list[i]){
            return true
        }
    }
}

exports.staticResource = staticResource

function serveStaticResource(req, res){
    var partes = req.url.split('/')
    var file = partes[partes.length -1 ]
    fs.readFile('public/' + file, (erro, dados)=>{
        if(erro){ // Recurso estático não encontrado
            console.log('Erro: ficheiro não encontrado ' + erro)
            res.statusCode = 404
            res.end('Erro: ficheiro não encontrado ' + erro)
        }
        else{
            if(file == 'favicon.ico'){
                res.setHeader('Content-Type', 'image/x-icon')
                res.end(dados)
            }
            else if(file == 'w3.css'){
                res.setHeader('Content-Type', 'text/css')
                res.end(dados)
            }
            // PNG images
            else{
                res.setHeader('Content-Type', 'image/png')
                res.end(dados)
            }    
        }
    })
}

exports.serveStaticResource = serveStaticResource