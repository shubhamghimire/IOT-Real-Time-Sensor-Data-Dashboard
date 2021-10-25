'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Stations', [
      {
        stationName: 'Station 1',
        sensorModel: 'HC-SR04',
        sensorId: 'mems_table',
        warningLevel: 8.452,
        deployedLocation: '27.2046,77.4977',
        installationDate: '2021-04-13T01:44:18+0000',
        inspectionDate: '2021-04-13T01:44:18+0000',
        extraField: JSON.stringify({ extra: '' }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        stationName: 'Station 2',
        sensorModel: 'HC-SR04',
        sensorId: 'cpsr_table',
        warningLevel: 20.58,
        deployedLocation: '27.2046,77.4977',
        installationDate: '2021-04-13T01:44:18+0000',
        inspectionDate: '2021-04-13T01:44:18+0000',
        extraField: JSON.stringify({ extra: '' }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Stations', null, {});
  }
};
