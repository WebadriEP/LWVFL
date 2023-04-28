import React, { useState } from "react"
import StatsAllTime from "./stats/StatsAllTime"
import { Box, Divider, HStack, Heading, Text, Center } from "@chakra-ui/react"
import StatsCurrentMonth from "./stats/StatsCurrentMonth"

const QuickStats = () => {
  const [memberStatsAllTime, setMemberStatsAllTime] = useState({})

  return (
    <>
      {/* Quick Stats heading */}
      <Heading as="h2" size="lg" mb={4} color="gray.700">
        Statistics
      </Heading>

      {/* Shadowed box container */}
      <Box
        border="1px solid"
        borderColor="gray.100"
        borderRadius={8}
        bg="white"
        shadow="md"
        px={8}
        py={6}
        mb={8}
      >
        {/* Horizontal stack to separate all-time from current month */}
        <HStack spacing={16} align="center">
          {/* All-time stats */}
          <Box align="start">
            <Text color="gray.600" fontSize="sm">
              All Time
            </Text>
            <StatsAllTime />
          </Box>

          <Center height="80px">
            <Divider orientation="vertical" />
          </Center>

          {/* Current month stats */}
          <Box>
            <Text color="gray.600" fontSize="sm">
              Current Month (
              {new Date().toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
              )
            </Text>
            <StatsCurrentMonth />
          </Box>
        </HStack>
      </Box>
    </>
  )
}

export default QuickStats
