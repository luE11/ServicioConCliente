const express = require('express')
const cors = require('cors')
const data = require('./data/plantas.json')
const app = express()
const port = 3000

app.use(cors())

app.get('/plantas', (req, res) =>{
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
app.put('/plantas', (req, res) =>{
    var nombre = req.query.nombre
    var edad = req.query.edad  
    if(nombre && edad){
        var nPlanta = new Planta(data.plantas.length+1, nombre, edad);
        savePlant(nPlanta)
        res.send('planta registrada :)')
    }else{
        res.send('parametros insuficientes')
    }
})

app.delete('/plantas', (req, res) =>{
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