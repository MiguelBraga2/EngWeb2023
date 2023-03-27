const axios = require('axios');
const fs = require('fs');

var jsonData = fs.readFileSync('./persons.json', 'utf-8');
var data = JSON.parse(jsonData);

for(let i = 0; i < data.length; i++) {
    axios.post('http://localhost:3000/persons', data[i])
        .then()
        .catch(erro => console.log("Erro na inserção do registo com id: " + data[i] + "\n" + erro));
}