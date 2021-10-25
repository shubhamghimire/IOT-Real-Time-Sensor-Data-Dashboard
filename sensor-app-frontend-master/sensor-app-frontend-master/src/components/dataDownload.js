import React from 'react';
import moment from 'moment';
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import apiRequest from "../helpers/apiRequest";
import FileDownload from "js-file-download";
import "react-datepicker/dist/react-datepicker.css";


class DataDownloadBlock extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      fileType: 'csv',
      sensorType: '',
      startdate: moment().format(),
      enddate: moment().format(),
      fileDownloadUrl: '',
      error: false
    }
    this.handleStartDate = this.handleStartDate.bind(this)
    this.handleEndDate = this.handleEndDate.bind(this)

  }



  handleStartDate(date) {
    this.setState({
      startdate: moment(date).format()
    })
  }

  handleEndDate(date) {
    this.setState({
      enddate: moment(date).format()
    })
  }


  handleSensorTypeChange = event => {
    this.setState({
      sensorType: event.target.value
    })
  }
  handleFileTypeChange = event => {
    this.setState({
      fileType: event.target.value
    })
  }

  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const startdate = moment(this.state.startdate).utc().format('yyyy-MM-DD HH:mm:SS')
      const enddate = moment(this.state.enddate).utc().format('yyyy-MM-DD HH:mm:SS')
      const requestUrl = `/api/v1/station/${this.props.SelectedStation}/${startdate},${enddate}/${this.state.fileType}/download`
      const response = await apiRequest({
        method: 'GET',
        url: `${requestUrl}`,
        responseType: 'blob'
      })
      if (response) {
        FileDownload(response.data, `${this.props.SelectedStation}${startdate}${enddate}.${this.state.fileType}`);
      }
    } catch {
      this.setState({
        error: 'Please check you have selected valid date range.'
      })
    }
  }


  render() {
    const { stationList } = this.props
    return (
      <div className="bg-white">
        <h1 className='download-block-header'>
          Download Datasets
        </h1>

        <form className="p-4" onSubmit={this.handleSubmit}>
          {this.state.error ? <p className="text-red-600 text-xs"> {this.state.error} </p> : ''}
          <div class="download-parameter-single-block">
            <div class="download-parameter-label">
              <label for="form-left-label">Select Sensor</label>
            </div>
            <div class="download-parameter-input">
              <select className='download-input-styling' value={this.state.sensorType} onChange={this.handleSensorTypeChange}>
              {stationList.map((station) => {
                return <option key={station.sensorId} value={station.sensorId}>{station.stationName}</option>
              })}
            </select>
            </div>
          </div>

          <div class="download-parameter-single-block">
            <div class="download-parameter-label">
              <label for="form-left-label">Start Datetime</label>
            </div>
            <div class="download-parameter-input">
              <DatePicker className='download-input-styling' showTimeSelect timeFormat="HH:mm" timeIntervals={5} dateFormat="yyyy/MM/dd HH:mm:SS" selected={this.state.startdate ? new Date(this.state.startdate) : null} onChange={this.handleStartDate} />
            </div>
          </div>

          <div class="download-parameter-single-block">
            <div class="download-parameter-label">
              <label for="form-left-label">End Datetime</label>
            </div>
            <div class="download-parameter-input">
              <DatePicker className='download-input-styling' showTimeSelect timeFormat="HH:mm" timeIntervals={5} dateFormat="yyyy/MM/dd HH:mm:SS" selected={this.state.enddate ? new Date(this.state.enddate) : null} onChange={this.handleEndDate} />
            </div>
          </div>

          <div class="download-parameter-single-block">
            <div class="download-parameter-label">
              <label for="form-left-label">File Type</label>
            </div>
            <div class="download-parameter-input">
              <select className="download-input-styling" value={this.state.fileType} onChange={this.handleFileTypeChange}>
              <option value="csv">csv</option>
              <option value="json">json</option>
            </select>
            </div>
          </div>
          <div className='download-button'>
            <button type="submit" onClick={this.handleSubmit}>Download</button>
          </div>

        </form>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    SelectedStation: state.stations.SelectedStation,
    stationList: state.stations.stationList

  }
}




export default connect(mapStateToProps)(DataDownloadBlock);