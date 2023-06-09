'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsToMany(models.Product, {
        as: 'items',
        through: models.CartItem,
        foreignKey: 'cartId'
      })
    }
  }
  Cart.init({
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'Carts',
    underscored: true,
  });
  return Cart;
};