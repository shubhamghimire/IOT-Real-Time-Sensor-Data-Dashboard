const { body } = require('express-validator');

const addStationRules = () => {
  return [
    body('sensorId')
      .notEmpty()
      .isString()
      .withMessage('SensorId cannot be empty or must be string.')
  ]
}

module.exports = {
  addStationRules
}