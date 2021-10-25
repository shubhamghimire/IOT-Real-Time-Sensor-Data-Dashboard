const pool = require('../config/dbConfig')

const getRecentEightHoursData = async (id, hour) => {
  const query = `
        SELECT * FROM ${id} WHERE date_time >= NOW() - INTERVAL '${hour}' HOUR ORDER BY date_time DESC;
    `;

  const client = await pool.connect();
  try {
    const data = await pool.query(query);
    client.release()
    return data.rows
  } catch (e) {
    client.release()
    console.log(`Failed to get data from datbase table ${tableName}` , e)
  }
}

module.exports = {
  getRecentEightHoursData
}