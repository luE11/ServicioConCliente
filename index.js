const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.get('/plantas', (req, res) =>{
    var data = require('./data/plantas.json')
    if(data.plantas.length>0){
        res.send(data.plantas)
    }else{
        res.send('No hay plantas registradas :(')
    }
})

/**
 * Otros usos /plantas:nombre -> en la url -> /plantas/orquidea solo para filtros
 * usando body... se cargan datos en body desde cliente, y se reciben en server con req.body
 */
app.post('/plantas', (req, res) =>{
    var nombre = req.body.nombre
    var edad = req.body.edad  
    console.log(req.body)
    if(nombre && edad){
        var data = require('./data/plantas.json')
        var nPlanta = new Planta(data.plantas.length+1, nombre, edad)
        res.send('planta registrada :)')
        savePlant(nPlanta)
    }else{
        console.log("No hay suficientes datos")
        res.send('parametros insuficientes')
    }
})

app.delete('/plantas', (req, res) =>{
    var data = require('./data/plantas.json')
    if(data.plantas.length>0){
        var fs = require('fs')
        var content = '{"plantas":[]}'
        fs.writeFile('./data/plantas.json', content, 'utf8', function(err){})
        res.send('Lista de plantas eliminada')
    }else{
        res.send('No hay plantas registradas')
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function savePlant(nPlanta){
    var fs = require('fs')
    fs.readFile('./data/plantas.json', function(err, content){
        var parseJs = JSON.parse(content)
        parseJs.plantas.push(nPlanta)
        fs.writeFile('./data/plantas.json', JSON.stringify(parseJs), 'utf8', function(err){})
    })   
}

class Planta {
    constructor(id, nombre, edad){
        this.id = id
        this.nombre = nombre
        this.edad = edad
    }
}