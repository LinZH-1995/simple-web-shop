'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsToMany(models.Product, {
        as: 'items',
        through: models.OrderItem,
        foreignKey: 'orderId'
      })
      Order.belongsTo(models.User, { foreignKey: 'userId' })
      Order.hasMany(models.Payment, { foreignKey: 'orderId' })
    }
  }
  Order.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    serialNumber: DataTypes.BIGINT(15),
    shippingStatus: DataTypes.STRING,
    paymentStatus: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    underscored: true,
  });
  return Order;
};