'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      bid.belongsTo(models.auction,{foreignKey:"auctionId"})
      bid.belongsTo(models.user,{foreignKey:"userId"})
    }
  }
  bid.init({
    ammount: DataTypes.INTEGER,
    acceptance: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'bid',
  });
  return bid;
};