const express = require('express')
const cors = require('cors')
const data = require('./data/plantas.json')
const app = express()
const port = 3000

app.use(cors())

app.get('/plantas', (req, res) =>{

})

/**
 * usando 
 */
app.put('/plantas', (req, res) =>{
    var nombre = req.query.nombre
    var edad = req.query.edad  
    var nPlanta = new Planta(data.plantas.length+1, nombre, edad);
    savePlant(nPlanta)
    res.send('planta registrada :)')
})

app.delete('/nombre', (req, res) =>{
    if(!name){
        res.send('No hay un nombre asignado')
    }else{
        name = ''
        res.send('Nombre eliminado')
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