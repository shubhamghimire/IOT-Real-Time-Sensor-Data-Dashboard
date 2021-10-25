import React from 'react';
import { connect } from "react-redux";
import RealtimeBlock from "../components/realtime";
import GraphBlock from "../components/graphChart";
import StationInformationBlock from "../components/stationInformation";
import WaterAlertBlock from "../components/waterAlert";
import DataDownloadBlock from "../components/dataDownload";
import { getSataionlList, getStationData, getHistoricData } from "../store/actions";
import { ifnotEmptyObj } from "../helpers/utils"
class Header extends React.Component {

  async componentDidMount() {
    const { getStationList, getStationData, getHistoricData } = this.props

    await getStationList()
    await getStationData(this.props.stationList[0]['sensorId'])
    await getHistoricData(this.props.stationList[0]['sensorId'])
  }

  render() {
    const { stationList, StationData, HistoricData } = this.props
    return (
      <div className="bg-gray-50 min-h-screen">
        {stationList.length > 0 && ifnotEmptyObj(StationData) ?
          <StationInformationBlock /> :
          'loading ...'
        }
        { ifnotEmptyObj(StationData) ?
          <>
            <RealtimeBlock />
            <WaterAlertBlock />
          </>
          : 'loading ...'
        }
        < div className="container m-auto flex flex-wrap ">
          <div className="overflow-hidden md:w-9/12 w-full md:pr-8">
            {HistoricData.length > 0 ?
              <GraphBlock />
              : 'loading ...'}
          </div>
          <div className="m-0  md:w-3/12 w-full"><DataDownloadBlock /></div>
        </div>
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stationList: state.stations.stationList,
    StationData: state.stations.StationData,
    HistoricData: state.stations.HistoricData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStationList: () => dispatch(getSataionlList()),
    getStationData: (selectedStation) => dispatch(getStationData(selectedStation)),
    getHistoricData: (selectedStation) => dispatch(getHistoricData(selectedStation))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
