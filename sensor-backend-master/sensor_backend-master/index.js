const app = require('./app');
const http = require('http').createServer(app);
var { Stations } = require('./models');

const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 3000;
require('dotenv').config();

const { getRecentDataForStation } = require('./controllers/getRecentDataForStation');
const { mailNotification } = require('./controllers/mailNotification');

(async () => {
  lastRecordedData = []
  let stations = await Stations.findAll({ raw: true });
  stations.map(async (station) => {
    const getRecentData = await getRecentDataForStation(station.sensorId);
    lastRecordedData.push({ ...station, ...getRecentData })
  })

  console.log(`Starting scheduler for MEMS and CPSR realtime data check ⌛`)

  setInterval(async () => {
    stations.map(async station => {
      const getRecentData = await getRecentDataForStation(station.sensorId);
      const getlastRecorded = lastRecordedData.filter(st => st.sensorId === station.sensorId)[0];
      if (getRecentData.id !== getlastRecorded.id) {
        // Checking the data for warning level mail notification
        await mailNotification(station.sensorId, getRecentData["water_level"])

        // Emitting new data to the socket client
        console.log(`New data updated in ${station.stationName}, emitting to the subscriber ‎️‍🔥 -  ${new Date()}`)
        await io.emit(station.sensorId, getRecentData);
        lastRecordedData = lastRecordedData.map(record => record.sensorId === station.sensorId ? { ...record, ...getRecentData } : record)
      }
    });
  }, process.env.CHECK_FREQUENCY || 5000);

})();

http.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});