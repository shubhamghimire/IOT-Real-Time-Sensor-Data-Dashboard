var { Stations } = require('../models');

module.exports = getStationById = async (req, res, next) => {
  try {
    const {id} = req.params;
    let stationInfo = await Stations.findOne(
        { where: { sensorId: id } 
    });
    if (stationInfo){
      return res.status(201).json({
        success: true,
        result: stationInfo
      })
    }
  } catch (err) {
    next(err)
  }
}