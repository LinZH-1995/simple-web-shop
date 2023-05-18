'use strict';

const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', Array.from({ length: 2 }, () => {
      return {
        name: faker.commerce.productName(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress({ useFullAddress: true }),
        amount: faker.finance.amount({ min: 1, max: 10, dec: 0 }),
        serial_number: faker.number.int({ max: 100 }),
        shipping_status: 0,
        payment_status: 0,
        user_id: Math.floor(Math.random() * 2) + 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    }))
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', {})
  }
};
