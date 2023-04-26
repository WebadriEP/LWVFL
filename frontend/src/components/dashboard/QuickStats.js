import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SkeletonText,
  Skeleton,
  Spinner,
} from "@chakra-ui/react"
import React, { useState, useEffect } from "react"
import axios from "axios"

const QuickStats = () => {
  const [totalMembers, setTotalMembers] = useState(null)
  const [totalDonations, setTotalDonations] = useState(null)
  const [totalDonationsAmount, setTotalDonationsAmount] = useState(null)

  axios
    .all([
      axios.get(process.env.REACT_APP_BACKEND_URL + "/api/members/stat/total"),
      axios.get(
        process.env.REACT_APP_BACKEND_URL + "/api/members/stat/donations"
      ),
      axios.get(
        process.env.REACT_APP_BACKEND_URL + "/api/members/stat/donationsamount"
      ),
    ])
    .then(
      axios.spread((res1, res2, res3) => {
        setTotalMembers(res1.data)
        setTotalDonations(res2.data)
        setTotalDonationsAmount(res3.data)
      })
    )
    .catch((errors) => {
      // react on errors.
    })

  return (
    <>
      {/* Box container */}
      <Box bg="white" mb={8} align="center">
        {/* Three column simple grid */}
        <SimpleGrid columns={3} spacing={10}>
          {/* Total Members */}
          <Box>
            <Stat>
              <StatLabel>Total Members</StatLabel>
              <StatNumber color="blue.500" fontSize={40}>
                {!totalMembers ? <Spinner mt={4} size="xl" /> : totalMembers}
              </StatNumber>
            </Stat>
          </Box>

          {/* Total Donations */}
          <Box>
            <Stat>
              <StatLabel>Donations Received</StatLabel>
              <StatNumber color="blue.500" fontSize={40}>
                {!totalMembers ? <Spinner mt={4} size="xl" /> : totalDonations}
              </StatNumber>
            </Stat>
          </Box>

          {/* Total Donations Amount */}
          <Box>
            <Stat>
              <StatLabel>Total Donated</StatLabel>
              <StatNumber color="blue.500" fontSize={40}>
                {!totalMembers ? (
                  <Spinner mt={4} size="xl" />
                ) : (
                  `$${totalDonationsAmount}`
                )}
              </StatNumber>
            </Stat>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  )
}

export default QuickStats
