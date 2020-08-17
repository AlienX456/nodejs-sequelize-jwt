
const { Sequelize } = require("sequelize");


module.exports = new Sequelize('pedidos', 'root', 'captmarvel', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});
