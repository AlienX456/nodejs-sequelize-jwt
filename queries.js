
const { DataTypes } = require("sequelize");
const sequelize = require('./bd')
const modelCliente = require('./models/cliente');
const modelPedido= require('./models/pedido');
const modelRPedido= require('./models/resumen_pedido');
const modelProducto = require('./models/pedido');

const Cliente = modelCliente(sequelize, DataTypes);
const Pedido = modelPedido(sequelize, DataTypes);
const RPedido = modelRPedido(sequelize, DataTypes);
const Producto = modelProducto(sequelize, DataTypes);

const getCliente = (request,response) => {
    
    Cliente.findByPk(request.params.id)
        .then((data) => {response.status(200).json(data)})
        .catch((err) => {response.status(500).json(err)})
}

const postCliente = (request,response) => {

    const cliente = request.body
    
    Cliente.create(cliente)
        .then((data) => {response.status(200).json(data)})
        .catch((err) => {response.status(500).json(err)})
        
}

const getPedido = (request, response) => {

    Pedido.hasMany(RPedido,{ foreignKey: 'pk_idpedido' });
    
    Pedido.findAll(
        {
            where : {fk_idcliente: request.params.id},
            include: [
                {model: RPedido}
            ]
        }
        )
        .then((data) => {response.status(200).json(data)})
        .catch((err) => {response.status(500).json(err)})
}

module.exports = {
    getCliente,
    postCliente,
    getPedido
}