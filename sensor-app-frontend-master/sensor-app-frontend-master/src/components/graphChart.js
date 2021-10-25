import { connect } from 'react-redux';
import React from 'react'
import Plot from 'react-plotly.js';
import moment from 'moment';

class GraphBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedParams: 'water_level'
    };
  }
  handleChange(e) {
    this.setState({
      selectedParams: e.target.value
    })
  }

  getThresholdLine(selectedParams, stationInfo) {
    if (selectedParams === 'water_level')
      return [
        {
          type: 'line',
          xref: 'paper',
          x0: 0,
          y0: stationInfo.warningLevel,
          x1: 1,
          y1: stationInfo.warningLevel,
          line: {
            color: 'rgb(255, 0, 0)',
            width: 1,
          }
        },
        {
          type: 'line',
          xref: 'paper',
          x0: 0,
          y0: stationInfo.warningLevel + 2,
          x1: 1,
          y1: stationInfo.warningLevel + 2,
          line: {
            color: '#fff0',
            width: 1,
          }
        }
      ]
    else {
      return false
    }
  }

  render() {
    const data = this.props.HistoricData;
    const { stationList, SelectedStation } = this.props;
    const filterParams = ['water_level', 'pressure', 'temperature', 'humidity'];
    let params = data.length > 0 ? Object.keys(data[0]).filter((item) => filterParams.includes(item)) : [];
    const stationInfo = stationList.filter(station => station.sensorId === SelectedStation)[0];
    return (
      <>
        <select className="select-chart" onChange={(e) => this.handleChange(e)}>
          {params.map((param) => {
            return <option key={param} value={param} defaultValue={param}>{param.replace('_',' ')}</option>
          })}
        </select>
        {data ?
          <Plot
            useResizeHandler
            data={[
              {
                x: data.map(({ date_time }) => moment(date_time).format()),
                y: data.map((values) => values[this.state.selectedParams]),
                type: 'scatter',
                mode: 'lines',
                date: 'AAPL Low',
                fill: 'tonexty',
                line: { color: 'rgb(14, 165, 233)' },
              }]}
            layout={{
              autosize: true,
              margin: {
                l: 50,
                r: 50,
                b: 50,
                t: 50,
                pad: 5
              },
              title: '',
              xaxis: {
                autorange: true,
                range: [data[0], data[data.length - 1]],
                rangeselector: {
                  buttons: [
                    {
                      count: 1,
                      label: '1h',
                      step: 'hour',
                      stepmode: 'backward'
                    },
                    {
                      count: 4,
                      label: '4h',
                      step: 'hour',
                      stepmode: 'backward'
                    },
                    { step: 'all' }
                  ]
                },
                rangeslider: { range: [data[0], data[data.length - 1]] },
                type: 'datetime'
              },
              yaxis: {
                rangemode: 'tozero',

                autorange: true,
                type: 'linear'
              },
              shapes: this.getThresholdLine(this.state.selectedParams, stationInfo)
            }}
            style={{ width: '100%', height: '100%'}}
          />
          : 'Graph Failed to load.'}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stationList: state.stations.stationList,
    SelectedStation: state.stations.SelectedStation,
    HistoricData: state.stations.HistoricData
  }
}



export default connect(mapStateToProps)(GraphBlock);