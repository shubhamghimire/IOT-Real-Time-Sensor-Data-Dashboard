var { Stations } = require('../models');

module.exports = createStation = async (req, res, next) => {
  try {
    const reqData = req.body
    let stations = await Stations.create({ ...reqData })
    if (stations){
      return res.status(201).json({
        success: true,
        result: stations
      })
    }
  } catch (err) {
    next(err)
  }
}
