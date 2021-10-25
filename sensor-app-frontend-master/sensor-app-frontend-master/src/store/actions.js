import apiRequest from "../helpers/apiRequest";
import { resParser } from "../helpers/utils";
export const GET_STATIONS = "GET_STATIONS";
export const GET_ERRORS = "GET_ERRORS";
export const SET_SATATION = 'SET_SATATION';
export const GET_STATION_DATA = 'GET_STATION_DATA';
export const UPDATE_STATION_DATA = 'UPDATE_STATION_DATA';
export const GET_HISTORIC_DATA = 'GET_HISTORIC_DATA';

export const getSataionlList = (state) => {
  return async (dispatch) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/api/v1/station/all',
        headers: { 'Content-Type': 'application/json' }
      })
      if (resParser(response)) {
        dispatch({
          type: GET_STATIONS,
          payload: {
            stationList: resParser(response)
          }
        })
        //Default selected station
        await dispatch(setSelectedStation(resParser(response)[0].sensorId))
      }
    } catch {
      dispatch({
        type: GET_ERRORS,
        payload: {
          error: 'Failed to fetch data from API.'
        }
      })
    }
  }
}

export const setSelectedStation = (station) => {
  return async (dispatch) => {
    dispatch({
      type: SET_SATATION,
      payload: {
        selectedStation: station
      }
    })
  }
}


export const getStationData = (station) => {
  return async (dispatch) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: `/api/v1/station/${station}/latest`,
        headers: { 'Content-Type': 'application/json' }
      })
      if (resParser(response)) {
        dispatch({
          type: GET_STATION_DATA,
          payload: {
            data: resParser(response)
          }
        })
      }
    } catch { }
  }
}

export const updatedStationData = (data) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_STATION_DATA,
      payload: {
        data: data
      }
    })
  }
}

// Getting data for the graph
export const getHistoricData = (station) => {
  return async (dispatch) => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: `/api/v1/station/${station}/recent/8`,
        headers: { 'Content-Type': 'application/json' }
      })
      if (resParser(response)) {
        dispatch({
          type: GET_HISTORIC_DATA,
          payload: {
            data: resParser(response)
          }
        })
      }
    } catch { }
  }
}