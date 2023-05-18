'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Carts', Array.from({ length: 3 }, () => {
      return { created_at: new Date(), updated_at: new Date() }
    }))
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Carts', {})
  }
};
