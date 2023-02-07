import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react';

// css
import './dashboardStyles.css'

const MembersGraph = () => {
  // options for the graph
  const options = {
    chart: {
      type: 'spline'
    },
    legend: {
      enabled: false
    },
    title: {
      text: ''
    },
    yAxis: {
      title: {
        text: 'Members'
      }
    },
    series: [
      {
        name: 'Members',
        data: [
          {
            name: 'July',
            y: 128
          },
          {
            name: 'August',
            y: 96
          },
          {
            name: 'September',
            y: 387
          },
          {
            name: 'October',
            y: 253
          },
          {
            name: 'November',
            y: 623
          },
        ]
      }
    ]
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default MembersGraph