const CsvParser = require("json2csv").Parser;
const {getDownloadData } = require('./getDownloadData');

module.exports = datataDownload = async (req, res, next) => {
  try {
      const {id, dateRange, format } = req.params;
      var dateTime = dateRange.split(",");
      const getData = await getDownloadData(id, dateTime[0], dateTime[1]);
      var filename = `${id}${dateTime[0]}_${dateTime[1]}`
      if(getData){
        if(format=='csv'){
             // write SQL function to retrive filtered data. 
          const csvParser = new CsvParser();
          const csvData = csvParser.parse(getData);
          res.setHeader("Content-Type", "text/csv");
          res.setHeader("Content-Disposition", "attachment; filename=" + filename +'.csv');
          res.status(200).end(csvData);    
        }
        else if(format=='json'){
          const jsonData = JSON.stringify(getData); 
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Content-Disposition','attachment; filename='+filename+'.json');
          res.status(200).end(jsonData);
        }
        else{
          next(err)
        }
       
      }

    } catch (err) {
      next(err)
    }
}