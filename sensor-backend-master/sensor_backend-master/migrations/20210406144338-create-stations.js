'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Stations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stationName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      sensorModel: {
        type: Sequelize.STRING
      },
      sensorId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      warningLevel: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      deployedLocation: {
        type: Sequelize.STRING
      },
      installationDate: {
        type: Sequelize.DATE
      },
      inspectionDate: {
        type: Sequelize.DATE
      },
      extraField: {
        type: Sequelize.JSONB
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Stations');
  }
};