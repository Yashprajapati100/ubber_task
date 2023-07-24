'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class card_deatils extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  card_deatils.init({
    customer_stripe_id: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'user_id',
      },
    },
    card_id: DataTypes.STRING,
    card_Name: DataTypes.STRING,
    card_ExpMonth: DataTypes.INTEGER,
    card_ExpYear: DataTypes.INTEGER,
    card_CVC: DataTypes.INTEGER,
    card_Number: DataTypes.STRING,
    source: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'card_deatils',
  });
  return card_deatils;
};