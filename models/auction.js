'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      auction.hasMany(models.bid,{foreignKey:"auctionId"})
      auction.belongsTo(models.user,{foreignKey:"userId"})
    }
  }
  auction.init({
    productName: DataTypes.STRING,
    productDescription: DataTypes.STRING,
    productImg: DataTypes.TEXT,
    productCondition: DataTypes.STRING,
    productType: DataTypes.STRING,
    minBid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'auction',
  });
  return auction;
};