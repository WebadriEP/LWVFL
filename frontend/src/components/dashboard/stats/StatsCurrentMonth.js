import React from "react"
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
} from "@chakra-ui/react"
import useApi from "../../../hooks/useApi"

const StatsCurrentMonth = () => {
  /*
   * Fetch current month's stats via useApi hook (new members, new donations, and donations amount)
   * - Provides access to: data, loading, and error states
   * - Data provided: newMembers, donations, and donationsAmount
   */
  const { data, loading, error } = useApi("/api/stats/month")

  if (loading)
    return <Skeleton height="50px" width="400px" speed={0.75} mb={4} /> // Loading spinner
  if (error)
    return (
      // Error alert
      <Alert status="error" mt={1}>
        <AlertIcon />
        <AlertTitle>Error loading stats.</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )

  return (
    <>
      {/* Box container */}
      <Box bg="white">
        <Flex gap={10} justify="space-between">
          {/* Total Members */}
          <Box>
            <Stat>
              <StatNumber color="blue.500" fontSize={{ base: "md", lg: "3xl" }}>
                {data ? data.totalMembers : <Spinner />}
              </StatNumber>
              <StatLabel fontSize="sm" color="gray.800">
                Members
              </StatLabel>
            </Stat>
          </Box>

          {/* Total Donations */}
          <Box>
            <Stat>
              <StatNumber color="blue.500" fontSize={{ base: "md", lg: "3xl" }}>
                {data ? data.totalDonations : <Spinner />}
              </StatNumber>
              <StatLabel fontSize="sm" color="gray.800">
                Donations
              </StatLabel>
            </Stat>
          </Box>

          {/* Total Donations Amount */}
          <Box>
            <Stat>
              <StatNumber color="blue.500" fontSize={{ base: "md", lg: "3xl" }}>
                {data ? "$" + data.totalDonationsAmount : <Spinner />}
              </StatNumber>
              <StatLabel fontSize="sm" color="gray.800">
                Donated
              </StatLabel>
            </Stat>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default StatsCurrentMonth
