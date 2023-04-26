import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import React, { useState } from "react"
import { getStatTotalMembers } from "../../api/axios"

/* 
  The graph uses Highcharts
  It's in a responsive container provided by the library
*/

const MembersGraph = (props) => {
  // deconstruct porops
  const { type, yAxis, members } = props

  // options for the graph
  const options = {
    chart: {
      type: type,
    },
    accessibility: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    title: {
      text: "New Members by Month",
    },
    xAxis: {
      categories: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    yAxis: {
      title: {
        text: yAxis,
      },
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {},
        },
      ],
    },
    series: [
      {
        name: "Members",
        data: [1, 20, 2, 6, 8, 7, 17, 19, 5, 8, 12, 32],
      },
    ],
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default MembersGraph
