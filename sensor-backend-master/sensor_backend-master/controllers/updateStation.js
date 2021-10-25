const e = require('express');
var { Stations } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reqData = req.body;
    const updated = await Stations.update(reqData, { where: { sensorId: id }, returning: true });
    if (updated[0]) {
      return res.status(201).json({
        success: true,
        result: updated[1][0]
      });
    } else {
      return res.status(400).json({
        success: false,
        error: 'Station not found.'
      });
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
};
