'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CartItems', Array.from({ length: 20 }, () => {
      return {
        quantity: Math.floor(Math.random() * 5) + 1,
        product_id: Math.floor(Math.random() * 10) + 1,
        cart_id: Math.floor(Math.random() * 3) + 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    }))
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CartItems', {})
  }
};
