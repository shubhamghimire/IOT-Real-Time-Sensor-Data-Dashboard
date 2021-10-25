const express = require('express');
const router = express.Router();

const { addStationRules} = require('../validation/stations')
const validationMiddleware = require('../middleware/validation')

const addStation = require('../controllers/addStation')
const updateStation = require('../controllers/updateStation')
const getAllStations = require('../controllers/getAllStations')
const getStationById = require('../controllers/getStationById')
const getRecentDataByStation = require('../controllers/getRecentDataByStation')
const getHistoryData = require('../controllers/getHistoryData')
const dataDownload = require('../controllers/dataDownload')
const getGraphData = require('../controllers/getGraphData')


// Routing for getting all the stations indormation
router.get('/station/all', getAllStations);

// Routing for getting individual station information by Id
router.get('/station/:id', getStationById);

// Getting data from an individual station on the first load of the dashboard
router.get('/station/:id/latest', getRecentDataByStation)

// Adding a new station to the database
router.post('/station', addStationRules(), validationMiddleware, addStation);

// Updating an existing station information
router.put('/station/:id', updateStation);

// Getting 8 hours data of a praticular station for graph
router.get('/station/:id/recent/:hour', getHistoryData);

// Getting data from the user input according to the station and the date provided by the user
router.get('/station/:id/graph/:date', getGraphData)

// Getting requested download data request from the frontend
router.get('/station/:id/:dateRange/:format/download', dataDownload)

module.exports = router;