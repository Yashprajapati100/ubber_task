'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('card_deatils', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_stripe_id: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'user_id',
        },
      },
      card_id: {
        type: Sequelize.STRING
      },
      card_Name: {
        type: Sequelize.STRING
      },
      card_ExpMonth: {
        type: Sequelize.INTEGER
      },
      card_ExpYear: {
        type: Sequelize.INTEGER
      },
      card_CVC: {
        type: Sequelize.INTEGER
      },
      card_Number: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('card_deatils');
  }
};