import { connect } from 'react-redux';
import React from 'react'
import alertIcon from '../images/alert.svg'


class WaterAlertBlock extends React.Component {
  
  getBackgroundColor = () => {
    const { StationData, stationList, SelectedStation } = this.props;
    const stationInfo = stationList.filter(station => station.sensorId === SelectedStation )[0];
    let text;
    let color;
    if (StationData.water_level >= stationInfo.warningLevel) {
        text = 'Warning! Water Level crosses the threshold value!';
        color = 'border-red-500 text-red-700 '
    }
    else{
       text = 'Currently there is no any water level alert or warning!'
       color = 'border-blue-500'
    }
    return [text, color];
  };
  
  render() {
    const [text, color] = this.getBackgroundColor();
      return (
        <div className="water-alert-box">
          <h4 className={color}><img src={alertIcon} className="alert-icon" alt="Alert" /><p className="alert-text">{text}</p></h4>
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

export default connect(mapStateToProps)(WaterAlertBlock);