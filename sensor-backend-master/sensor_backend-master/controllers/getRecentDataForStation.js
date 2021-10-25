
const pool = require('../config/dbConfig')

const getRecentDataForStation = async (tableName) => {
  const query = `
    SELECT * FROM ${tableName} order by id desc limit 1
    `;
  const client = await pool.connect();
  try {
    const data = await pool.query(query);
    client.release()
    return data.rows[0]
  } catch (e) {
    client.release()
    console.log(`Failed to get data from datbase table ${tableName}` , e)
  }
}

module.exports = {
  getRecentDataForStation
}