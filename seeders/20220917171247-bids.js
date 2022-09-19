'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('bids',[
      {
        ammount:6500,
        acceptance:false,
        auctionId:1,
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ammount: 2500,
        acceptance: false,
        auctionId: 2,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bids', null, {});

  }
};
