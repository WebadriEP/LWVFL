// components
import React, { useState } from "react"
import { Box, Grid, Flex, Heading } from "@chakra-ui/react"
import QuickActions from "../components/dashboard/QuickActions"
import MembersGraph from "../components/dashboard/MembersGraph"
import QuickStats from "../components/dashboard/QuickStats"
import { getAllMembers } from "../api/axios"

// css
import "../components/dashboard/dashboardStyles.css"

const Dashboard = () => {
  const [members, setMembers] = React.useState([])

  return (
    <>
      <Heading size="xl" mb={8}>
        Dashboard
      </Heading>

      {/* Quick Stats */}
      <QuickStats />

      {/* Quick Actions */}
      <QuickActions />

      {/* Members Graph */}
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
          yAxis="No. of New Members"
          members={members}
        />
      </Box>
    </>
  )
}

export default Dashboard
