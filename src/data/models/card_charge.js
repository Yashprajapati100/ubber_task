'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class card_charge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  card_charge.init({
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
    charge_id: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    date: DataTypes.DATE,
    currency: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'card_charge',
  });
  return card_charge;
};