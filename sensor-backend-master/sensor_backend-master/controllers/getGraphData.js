const { getGraphDataByDateStation } = require('./getGraphDataByDateStation');

module.exports = getHistoryData = async (req, res, next) => {
  try {
      const {id, date } = req.params;
      const getLatestData = await getGraphDataByDateStation(id, date);
      if (getLatestData){
        return res.status(201).json({
          success: true,
          result: getLatestData
        })
      }
    } catch (err) {
      next(err)
    }
}