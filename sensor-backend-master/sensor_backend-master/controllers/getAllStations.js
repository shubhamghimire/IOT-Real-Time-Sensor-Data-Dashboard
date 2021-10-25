var { Stations } = require('../models');

module.exports = getStation = async (req, res, next) => {
  try {
    let stations = await Stations.findAll();
    if (stations){
      return res.status(201).json({
        success: true,
        result: stations
      })
    }
  } catch (err) {
    next(err);
  }
}