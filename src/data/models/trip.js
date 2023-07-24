'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  trip.init({
     trip_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    driver_id:{
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'user_id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'user_id',
      },
    },
    start_latitude: DataTypes.DOUBLE,
    start_longitude: DataTypes.DOUBLE,
    end_latitude: DataTypes.DOUBLE,
    end_longitude: DataTypes.DOUBLE,
    start_point: DataTypes.DOUBLE,
    end_point: DataTypes.DOUBLE,
    tripfare: DataTypes.DOUBLE,
    farecollected: DataTypes.BOOLEAN,
    start_time: {
      type: DataTypes.TIME
    },
    end_time: {
      type: DataTypes.TIME
    }
  }, {
    sequelize,
    modelName: 'trip',
  });
  return trip;
};