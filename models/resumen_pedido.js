/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resumen_pedido', {
    pk_idpedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'pedido',
        },
        key: 'pk_idpedido'
      }
    },
    pk_idproducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'producto',
        },
        key: 'pk_idproducto'
      }
    },
    c_cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'resumen_pedido',
    underscored: true,
  });
};
