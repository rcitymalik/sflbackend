'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('auctions',[{
      productName:"Captain America Comics",
      productDescription:"One of the most rare Golden Age comic books, so much so that even incomplete copies have sold for as much as $5,400.",
      productImg:"https://static.wikia.nocookie.net/marveldatabase/images/8/8d/Captain_America_Vol_1_194.jpg/revision/latest?cb=20171227231827",
      productCondition: "mint",
      productType:"comics",
      minBid: 6000,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
      {
        productName:"Crimson Dawn Psylocke Variant",
        productDescription:"Due to its rarity, the toy could cost anywhere around $15,000. It was sold on E-Bay for as high as $2,500.",
        productImg:"https://gobookmart.com/wp-content/uploads/2022/06/marvel-toys.jpg",
        productCondition: "near mint",
        productType:"toys",
        minBid: 2000,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('auctions',null,{})
  }
};
