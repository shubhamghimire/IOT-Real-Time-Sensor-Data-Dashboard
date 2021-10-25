const { getRecentDataForStation } = require('../controllers/getRecentDataForStation');

module.exports = getRecentDataFirstLoad = async (req, res, next) => {
    try {
        const tableName = req.params;
        const getLatestData = await getRecentDataForStation(tableName["id"]);
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