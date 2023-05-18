'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('OrderItems', Array.from({ length: 10 }, () => {
      return {
        price: Math.floor(Math.random() * 1000) + 1,
        quantity: Math.floor(Math.random() * 10) + 1,
        order_id: Math.floor(Math.random() * 2) + 1,
        product_id: Math.floor(Math.random() * 10) + 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    }))
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderItems', {})
  }
};
