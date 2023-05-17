'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Order, { foreignKey: 'orderId' })
    }
  }
  Payment.init({
    amount: DataTypes.INTEGER,
    serialNumber: DataTypes.INTEGER,
    paymentMethod: DataTypes.STRING,
    paidAt: DataTypes.DATE,
    params: DataTypes.TEXT,
    orderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Payment',
    tableName: 'Payments',
    underscored: true,
  });
  return Payment;
};