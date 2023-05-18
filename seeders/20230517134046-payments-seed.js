'use strict';

const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Payments', Array.from({ length: 5 }, () => {
      return {
        amount: faker.number.int({ max: 100 }),
        serial_number: faker.number.int({ max: 100 }),
        payment_method: Math.floor(Math.random() * 3) + 1,
        paid_at: new Date(),
        params: null,
        order_id: Math.floor(Math.random() * 2) + 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    }))
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Payments', {})
  }
};
