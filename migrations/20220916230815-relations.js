'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('characters', "teamId",{
      type: Sequelize.INTEGER,
      references:{
        model:"teams",
        key:"id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("teams","userId",{
      type: Sequelize.INTEGER,
      references:{
        model: "users",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("auctions","userId",{
      type: Sequelize.INTEGER,
      references:{
        model: "users",
        key:"id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("bids","auctionId",{
      type: Sequelize.INTEGER,
      references:{
        model: "auctions",
        key:"id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("bids","userId",{
      type: Sequelize.INTEGER,
      references:{
        model: "users",
        key:"id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });

  },


  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn("teams","userId");
    await queryInterface.removeColumn("characters","teamId");
    await queryInterface.removeColumn("auctions","userId");
    await queryInterface.removeColumn("bids","auctionId");
    await queryInterface.removeColumn("bids","userId");

  }
};
