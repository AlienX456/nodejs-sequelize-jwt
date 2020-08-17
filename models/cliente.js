/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cliente', {
    pk_idcliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    i_nombre: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    i_apellido: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    c_pass: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cliente'
  });
};
