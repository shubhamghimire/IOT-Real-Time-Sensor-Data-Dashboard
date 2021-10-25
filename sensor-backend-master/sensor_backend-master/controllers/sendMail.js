const sgMail = require('@sendgrid/mail')
require('dotenv').config();

const sendMail = async (stationInfo, data) => {
    sgMail.setApiKey(process.env.API_KEY)
    
    const msg = {
        to: 'lostboy.shubham@gmail.com',
        from: 'mailservertesting777@gmail.com',
        Subject: 'Water Level Warning on' + stationInfo['stationName'],
        Text: 'Water Level on station '+stationInfo['stationName']+ ' has crossed the warning Level. The current level is at '+ data+'m on '+ new Date()+'.',
    }
    sgMail.send(msg, function(err, info) {
        if (err) {
            console.log("Email not sent")
        }
        else {
            console.log("Email successfully sent")
        }
    }
    );
  }
  
  module.exports = {
    sendMail
  }