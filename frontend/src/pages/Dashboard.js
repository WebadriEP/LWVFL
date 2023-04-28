// components
import React from "react"
import { Box, Heading } from "@chakra-ui/react"
import QuickActions from "../components/dashboard/QuickActions"
import MembersGraph from "../components/dashboard/MembersGraph"
import QuickStats from "../components/dashboard/QuickStats"
import DonationsGraph from "../components/dashboard/DonationsGraph"

const Dashboard = () => {
  return (
    <>
      {/* Quick Stats */}
      <QuickStats />

      {/* Quick Actions */}
      <QuickActions />

      <Heading size="lg" mb={4} color="gray.700">
        Graphs
      </Heading>

      {/* Members Graph */}
      <Box
        shadow="md"
        bg="white"
        p={5}
        borderRadius={10}
        border="1px solid"
        borderColor="gray.100"
        mb={8}
      >
        <MembersGraph type="column" yAxis="No. of New Members" />
      </Box>

      {/* Donations  Graph */}
      <Box
        shadow="md"
        bg="white"
        p={5}
        borderRadius={10}
        border="1px solid"
        borderColor="gray.100"
        my={8}
      >
        <DonationsGraph type="line" yAxis="Amount of Donations ($USD)" />
      </Box>
    </>
  )
}

export default Dashboard
