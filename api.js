//DEPENDENCIAS
const express = require('express')
const app = express()
app.use(express.json())
//QUERIES
const db = require('./queries')

//PORT FOR SERVE
const port = 5000

//API OPERATIONS
app.get('/api/v1/cliente/:id',db.getCliente)
app.post('/api/v1/cliente',db.postCliente)

app.get('/api/v1/pedido-cliente/:id',db.getPedido)

app.get('/api/v1/many-many/:id',db.getManyMany)

//INIT API
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})