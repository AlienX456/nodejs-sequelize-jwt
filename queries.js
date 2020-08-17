
const { DataTypes } = require("sequelize");
const sequelize = require('./bd')
const modelCliente = require('./models/cliente');
const modelPedido= require('./models/pedido');
const modelRPedido= require('./models/resumen_pedido');
const modelProducto = require('./models/pedido');

const jwt = require('jsonwebtoken')
const secret = 'my-jwt-secret'

const Cliente = modelCliente(sequelize, DataTypes);
const Pedido = modelPedido(sequelize, DataTypes);
const RPedido = modelRPedido(sequelize, DataTypes);
const Producto = modelProducto(sequelize, DataTypes);

const bcrypt = require('bcrypt');
const { request } = require("http");
const { response } = require("express");

const getCliente = (request,response) => {
    
    Cliente.findByPk(request.params.id)
        .then((data) => {response.status(200).json(data)})
        .catch((err) => {response.status(500).json(err)})

}

const postCliente = (request,response) => {

    const cliente = request.body

    const salt_rounds = 10;

    bcrypt.hash(cliente.c_pass, salt_rounds, function(err, hash) {
            if(hash){

                cliente.c_pass = hash

                Cliente.create(cliente)
                .then(() => {
                    response.status(500).send(jwt.sign({pk_idcliente: cliente.pk_idcliente},secret,{ expiresIn: 30 }))
                })
                .catch((err) => {response.status(500).json(err)})
            }else{
                console.log(err)
            }
        },
    );
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


const postAuth = (request,response) => {
    const cliente = request.body

    Cliente.findByPk(cliente.pk_idcliente)
        .then((data) => {
            bcrypt.compare(cliente.c_pass, data.c_pass, function(err, result) {
                if (result){
                    response.status(200).send(jwt.sign({pk_idcliente: cliente.pk_idcliente},secret,{ expiresIn: 30 }))
                }else{
                    response.status(403).send(err)
                }
            });

        })
        .catch((err) => {response.status(500).json(err)})

}

















const getManyMany = (request, response) => {

    Pedido.belongsToMany(Producto, { through: RPedido});
    Producto.belongsToMany(Pedido, { through: RPedido});

    // Pedido.hasMany(RPedido,{ foreignKey: 'pk_idpedido' });
    // RPedido.belongsTo(Pedido)

    // Producto.hasMany(RPedido,{ foreignKey: 'pk_idproducto' });
    // RPedido.belongsTo(Producto)

    
    Pedido.findAll(
        {
            where : {fk_idcliente: request.params.id},
            include: [
                {model: Producto}
            ]
        }
        )
        .then((data) => {response.status(200).json(data)})
        .catch((err) => {response.status(500).json(err)})
}

module.exports = {
    getCliente,
    postCliente,
    getPedido,
    postAuth,
    getManyMany
}