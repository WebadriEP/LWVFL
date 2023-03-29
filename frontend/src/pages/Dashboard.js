// components
import React, { useState } from "react"
import { Box, Grid, Flex } from "@chakra-ui/react"
import QuickActions from "../components/dashboard/QuickActions"
import MembersGraph from "../components/dashboard/MembersGraph"
import { getAllMembers } from "../api/axios"

// css
import "../components/dashboard/dashboardStyles.css"
import { Heading } from "@chakra-ui/react"

const Dashboard = () => {
  const [members, setMembers] = React.useState([])

  React.useEffect(() => {
    getAllMembers()
      .then((res) => {
        setMembers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      {/* Quick Actions */}
      <QuickActions />

      <Box
        shadow="lg"
        bg="white"
        p={5}
        borderRadius={10}
        border="1px solid"
        borderColor="gray.100"
      >
        <MembersGraph
          type="column"
          title="New members"
          yAxis="No. of Members"
          members={members}
        />
      </Box>
    </>
  )
}

export default Dashboard
