'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trips', {
      trip_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tripDate: {
        type: Sequelize.DATE
      },
      driver_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'user_id',
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'user_id',
        }
      },
      start_time: {
        type: Sequelize.TIME
      },
      end_time: {
        type: Sequelize.TIME
      },
      start_latitude: {
        type: Sequelize.DOUBLE
      },
      start_longitude: {
        type: Sequelize.DOUBLE
      },
      end_latitude: {
        type: Sequelize.DOUBLE
      },
      start_point: {
        type: Sequelize.DOUBLE
      },
      end_point: {
        type: Sequelize.DOUBLE
      },
      end_longitude: {
        type: Sequelize.DOUBLE
      },
      tripFare: {
        type: Sequelize.DOUBLE
      },
      fareCollected: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trips');
  }
};