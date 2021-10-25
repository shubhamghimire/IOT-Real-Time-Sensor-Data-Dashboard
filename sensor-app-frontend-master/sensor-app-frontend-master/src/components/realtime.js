import React, { Component } from 'react'
import { connect } from "react-redux";
import socketIOClient from 'socket.io-client';

import waterIcon from "../images/waterlevel.svg"
import tempIcon from "../images/temperature.svg"
import humIcon from "../images/humidity.svg"
import pressureIcon from "../images/pressure.svg"
import { updatedStationData } from "../store/actions";

const ENDPOINT = 'http://localhost:3000';

class RealtimeBlock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedStation: false
    };
    this.socket = socketIOClient(ENDPOINT);
  }

  componentDidMount() {
    const { SelectedStation, updatedStationData } = this.props;
    // Connecting realtime listener
    this.socket.on(`${SelectedStation}`, data => {
      updatedStationData(data)
    });
    this.setState({ selectedStation: SelectedStation })
  }

  componentDidUpdate() {
    const { SelectedStation, updatedStationData } = this.props
    if (this.state.selectedStation !== SelectedStation) {
      // Remove realtime listener for old selected stations
      this.socket.removeListener(`${this.state.selectedStation}`);

      // Connecting realtime listener for new selected stations
      this.socket.on(`${SelectedStation}`, data => {
        updatedStationData(data)
      });
      this.setState({ selectedStation: SelectedStation })
    }
  }

  render() {
    const { StationData } = this.props;
    return (
      <div className="container m-auto">
        <div className="realtime-box ">
          <div className="realtime-block-display">
            <div className="parameter-icon">
              <img src={waterIcon} alt="Water" />
            </div>
            <div className="parameter-values">
              <header>
                <h1>Water Level</h1>
                <p className="pt-2 font-bold">{StationData.water_level}&nbsp;m</p>
              </header>
            </div>
          </div>
          <div className="realtime-block-display">
            <div className="parameter-icon">
              <img src={tempIcon} alt="Temperature" />
            </div>
            <div className="parameter-values">
              <header>
                <h1>Temperature</h1>
                <p className="pt-2 font-bold">{StationData.temperature}&nbsp;&#8451;</p>
              </header>
            </div>
          </div>
          <div className="realtime-block-display">
            <div className="parameter-icon">
              <img src={humIcon} alt="Humidity" />
            </div>
            <div className="parameter-values">
              <header>
                <h1>Humidity</h1>
                <p className="pt-2 font-bold">{StationData.humidity}&nbsp;%</p>
              </header>
            </div>
          </div>
          <div className="realtime-block-display">
            <div className="parameter-icon">
              <img src={pressureIcon} alt="Pressure" />
            </div>
            <div className="parameter-values">
              <header>
                <h1>Pressure</h1>
                <p className="pt-2 font-bold">{StationData.pressure}&nbsp;hPa</p>
              </header>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    SelectedStation: state.stations.SelectedStation,
    StationData: state.stations.StationData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatedStationData: (data) => dispatch(updatedStationData(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RealtimeBlock);