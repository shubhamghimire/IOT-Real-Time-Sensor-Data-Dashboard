import moment from 'moment';
import React from 'react'
import { connect } from "react-redux";

import SelectStation from "../components/selectStation/selectStation";


class StationInformationBlock extends React.Component {

  render() {
    const { StationData, stationList, SelectedStation } = this.props;
    const stationInfo = stationList.filter(station => station.sensorId === SelectedStation )[0];

    return (
      <div className="bg-white">
        <div className="station-information-box">
          <div className="grid-box grid-box-content">
            <div className="grid-box-content-box">
              <h1>Updated Datetime: </h1>
              <p>{StationData ? moment(StationData.date_time).format('MM/DD/YYYY, h:mm:ss a'): ''}</p>
              <h2>Sensor Model:</h2>
              <p>{stationInfo ? stationInfo.sensorModel : ''}</p>
            </div>
            <div className="grid-box-content-box">
              <h1>Deployed Location:</h1>
              <p>{stationInfo ? stationInfo.deployedLocation : ''}</p>
              <h2>Latitude Longitude:</h2>
              <p>{stationInfo ? stationInfo.deployedLocation : ''}</p>
            </div>
            <div className="grid-box-content-box">
              <h1>Installation Date:</h1>
              <p>{stationInfo ? moment(stationInfo.installationDate).format('MM/DD/YYYY, h:mm:ss a') : ''}</p>
              <h2>Warning Level:</h2>
              <p>{stationInfo ? stationInfo.warningLevel : ''}&nbsp;m</p>
            </div>
            <div className="grid-box-content-box pl-56">
              <SelectStation />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      stationList: state.stations.stationList,
      SelectedStation: state.stations.SelectedStation,
      StationData: state.stations.StationData
    }
  }
export default connect(mapStateToProps)(StationInformationBlock);
