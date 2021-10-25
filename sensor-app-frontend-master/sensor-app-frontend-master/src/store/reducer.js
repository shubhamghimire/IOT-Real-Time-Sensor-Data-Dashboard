import { combineReducers } from 'redux';
import { GET_STATIONS, GET_ERRORS, SET_SATATION, GET_STATION_DATA, UPDATE_STATION_DATA, GET_HISTORIC_DATA } from './actions';

const initState = {
  stationList : [],
  errors: false,
  validErrors: [],
  SelectedStation: null,
  StationData: {},
  HistoricData: []
}

const stationsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_STATIONS:
      return {
        ...state,
        ...action.payload
      };
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload.error
      };

    case SET_SATATION: 
      return  {
        ...state,
        SelectedStation: action.payload.selectedStation
      };

    case GET_STATION_DATA:
      return {
        ...state,
        StationData: action.payload.data
      };

    case UPDATE_STATION_DATA:
      return {
        ...state,
        StationData: action.payload.data
      };

    case GET_HISTORIC_DATA:
      return {
        ...state,
        HistoricData: action.payload.data
      }

    default:
      return state
  }
}

export default combineReducers({ stations: stationsReducer })
