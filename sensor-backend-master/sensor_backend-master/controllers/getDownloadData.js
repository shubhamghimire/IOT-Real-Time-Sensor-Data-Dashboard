const pool = require('../config/dbConfig')

const getDownloadData= async (id, startDate, endDate) => {
  const query = `
    SELECT * FROM ${id} where date_time between '${startDate}' and '${endDate}'
    `;

  const client = await pool.connect();
  try {
    const data = await pool.query(query);
    client.release()
    return data.rows
  } catch (e) {
    client.release()
    console.log(`Failed to get data from datbase table ${id}` , e)
  }
}

module.exports = {
  getDownloadData
}