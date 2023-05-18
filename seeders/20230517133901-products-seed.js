'use strict';

const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', Array.from({ length: 10 }, () => {
      return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 10, max: 1000, dec: 0 }),
        image: faker.image.url({ height: 300, width: 300 }),
        created_at: new Date(),
        updated_at: new Date()
      }
    }))
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', {})
  }
};
