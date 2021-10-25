const pool = require('../config/dbConfig')

const getGraphDataByDateStation = async (id, date) => {
  // Getting data of 4 days when user selects a date in date time picker. For example, if user selects '2021-06-01' then get data from '2021-06-01' to '2021-06-04'.
  // const query = `
  //       SELECT * FROM ${id} WHERE date_time BETWEEN date '${date}' AND (date '${date}' - INTERVAL '4 DAYS');
  //   `;

  // Getting data of last 4 days when user selects a date in date time picker. For example, if user selects '2021-06-05' then get data from '2021-06-01' to '2021-06-05'.
  const query = `
      SELECT * FROM ${id} WHERE date_time BETWEEN (date '${date}' - INTERVAL '3 DAYS') AND (date '${date}' + INTERVAL '1 DAY')
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
    getGraphDataByDateStation
}