import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const data = [
  {month: 'July', members: 128, amt: 1000},
  {month: 'August', members: 378, amt: 1000},
  {month: 'September', members: 200, amt: 1000},
  {month: 'October', members: 278, amt: 1000},
  {month: 'November', members: 189, amt: 1000}
]

// css
import './dashboardStyles.css'

/* 
  The graph uses Highcharts
  It's in a responsive container provided by the library
*/

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

  return (
    <div className="graph-container" id="membersGraph">
      {/* Line chart showing data */}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default MembersGraph