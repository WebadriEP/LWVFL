import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import React from "react"
import useApi from "../../hooks/useApi"
import {
  Text,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"

const MembersGraph = (props) => {
  const { type, yAxis } = props // type of graph, y-axis label, and members data
  const { data, loading, error } = useApi("/api/stats/monthlymembers")

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
    series: [
      {
        name: "Members",
        data: data,
      },
    ],
  }

  // Iterate through data and sum up all the monthly members
  // - This is used to determine if there are any members to display
  let sumOfMonthlyMembers = 0
  if (data) {
    data.forEach((monthlyMembers) => {
      sumOfMonthlyMembers += monthlyMembers
    })
  }

  // Loading skeleton
  if (loading) return <Skeleton height="400px" speed={0.75} />

  // If there are no members to display, display a message
  if (sumOfMonthlyMembers == 0) return <Text>No members to display.</Text>

  // Error alert (if error or no data at all)
  if (error || !data)
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Couldn't render graph.</AlertTitle>
        <AlertDescription>
          Sorry, something went wrong when loading the graph. Error:
          {error}
        </AlertDescription>
      </Alert>
    )

  // Render the graph
  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default MembersGraph
