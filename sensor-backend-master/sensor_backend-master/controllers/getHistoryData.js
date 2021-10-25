const { getRecentEightHoursData } = require('./getRecentEightHoursData');

module.exports = getHistoryData = async (req, res, next) => {
  try {
      const {id, hour } = req.params;
      const getLatestData = await getRecentEightHoursData(id, hour);
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