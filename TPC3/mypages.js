// mypages.js
// 2023-03-03 by jcr
// HTML templates generating functions

exports.genMainPage = function(lista, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Pessoas</h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Sexo</th>
                        <th>Cidade</th>
                    </tr>
                `
    for(let i=0; i < lista.length; i++){
        pagHTML += `
        <tr>
            <td>${lista[i].id}</td>
            <td>
                <a href="/pessoas/${lista[i].id}">${lista[i].nome}</a>
            </td>
            <td>${lista[i].idade}</td>
            <td>${lista[i].sexo}</td>
            <td>${lista[i].morada.cidade}</td>
        </tr>
        `
    }

    pagHTML += `
                    </table>
                </div>
                <footer class="w3-container w3-purple">
                    <h5>Generated in EngWeb2023 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.genPersonPage = function(p, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Person Page</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>${p.nome}</h1>
                </header>

                <div class="container w3-margin-left" >
                    <p><b>Idade</b>: ${p.idade}</p>
                    <p><b>Sexo</b>: ${p.idade}</p>
                    <p><b>Morada</b>: ${p.morada.cidade} - ${p.morada.distrito}</p>
                    <p><b>BI</b>: ${p.BI}</p>
                    <p><b>Profissão</b>: ${p.profissao}</p>
                    <p><b>Partido político</b>: ${p.partido_politico.party_abbr} :  ${p.partido_politico.party_name}</p>
                    <p><b>Religião</b>: ${p.religiao}</p>
                    <p><b>Desportos</b>: ${p.desportos}</p>
                    <p><b>Animais</b>: ${p.animais}</p>
                    <p><b>Figuras Publicas PT</b>: ${p.figura_publica_pt}</p>
                    <p><b>Marca de Carro</b>: ${p.marca_carro}</p>
                    <p><b>Destinos favoritos</b>: ${p.destinos_favoritos}</p>
                    <p><b>Atributos</b>: ${p.atributos}</p>
    `

    pagHTML += `</div>
                <footer class="w3-container w3-purple">
                    <h5>Generated in EngWeb2023 ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.genIndex = function() {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Menu</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-sidebar w3-bar-block w3-border-right" style="display:none" id="mySidebar">
                <button onclick="w3_close()" class="w3-bar-item w3-large">Close &times;</button>
                <a href="/pessoas" class="w3-bar-item w3-button">Lista de pessoas </a>
                <a href="/pessoasOrdenadas" class="w3-bar-item w3-button">Lista de pessoas ordenadas</a>
                <a href="/sexo" class="w3-bar-item w3-button">Distribuição por sexo</a>
                <a href="/desporto" class="w3-bar-item w3-button">Distribuição por desporto</a>
                <a href="#" class="w3-bar-item w3-button">Top 10 profissões</a>
            </div>
            <div class="w3-teal">
                <button class="w3-button w3-teal w3-xlarge" onclick="w3_open()">☰</button>
                <div class="w3-container">
                    <h1>Página inicial</h1>
                </div>
            </div>
            <script>
                function w3_open() {
                document.getElementById("mySidebar").style.display = "block";
                }
                
                function w3_close() {
                document.getElementById("mySidebar").style.display = "none";
                }
            </script>
        </body>
    </html>`
    return pagHTML
}

exports.genDistributionPage = function(dist, data, tipo, keys){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Distribuição por ${tipo}</h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                    <tr>
                        <th>Valor</th>
                        <th>Contagem</th>
                    </tr>
                `
    for(let i=0; i<keys.length; i++){
        pagHTML += `
                    <tr>
                        <td>${keys[i]}</td>
                        <td>${dist[keys[i]]}</td>
                    </tr>
        `
    }

    pagHTML += `
                    </table>
                </div>
                <footer class="w3-container w3-purple">
                    <h5>Generated in EngWeb2023 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}