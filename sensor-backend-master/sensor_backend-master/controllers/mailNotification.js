var { Stations } = require('../models')
const { sendMail } = require('../controllers/sendMail')

const mailNotification = async (tableName, data) => {
    let stationInfo = await Stations.findOne(
        { where: { sensorId: tableName } 
    });
    if (data>=stationInfo['warningLevel']){
        console.log("mail notification")
        await sendMail(stationInfo, data)
    }
    else {
        console.log("No notification")
    }
  }
  
  module.exports = {
    mailNotification
  }