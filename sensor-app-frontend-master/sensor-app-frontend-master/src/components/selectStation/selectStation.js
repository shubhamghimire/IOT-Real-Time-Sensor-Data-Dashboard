import React from 'react'
import { connect } from "react-redux";
import { setSelectedStation, getStationData, getHistoricData} from "../../store/actions";

class SelectStation extends React.Component {

  handleChange(e, setSelectedStation) {
    setSelectedStation(e.target.value )
    this.props.getStationData(e.target.value)
    this.props.getHistoricData(e.target.value)
  }

  render() {
    const { stationList, setSelectedStation } = this.props
    return (
      <div>
        <select className="select-station-box" onChange={(e) => this.handleChange(e, setSelectedStation)}>
          {stationList.map((station) => {
            return <option key={station.sensorId} value={station.sensorId}>{station.stationName}</option>
          })}
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stationList: state.stations.stationList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedStation: (selectedStation) => dispatch(setSelectedStation(selectedStation)),
    getStationData: (selectedStation) => dispatch(getStationData(selectedStation)),
    getHistoricData: (selectedStation) => dispatch(getHistoricData(selectedStation))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectStation);