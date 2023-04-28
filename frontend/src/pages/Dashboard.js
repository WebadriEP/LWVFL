// components
import React, { useState, useEffect } from "react"
import { Box, Grid, Flex, Heading } from "@chakra-ui/react"
import QuickActions from "../components/dashboard/QuickActions"
import MembersGraph from "../components/dashboard/MembersGraph"
import QuickStats from "../components/dashboard/QuickStats"

const Dashboard = () => {
  return (
    <>
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
        <MembersGraph type="column" yAxis="No. of New Members" />
      </Box>
    </>
  )
}

export default Dashboard
