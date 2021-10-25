'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stations extends Model {
    static associate(models) {
    }
  };

  Stations.init({
    stationName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    sensorModel: DataTypes.STRING,
    sensorId: {
      type: DataTypes.STRING, // identified as station DB table Name
      allowNull: false
    },
    warningLevel: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    deployedLocation: DataTypes.STRING,
    installationDate: DataTypes.DATE,
    inspectionDate: DataTypes.DATE,
    extraField: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Stations',
  });

  return Stations;

};