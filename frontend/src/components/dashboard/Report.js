import { Component } from "react"
import {
  Box,
  Heading,
  Flex,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Text,
} from "@chakra-ui/react"
import MembersGraph from "./MembersGraph"
import {
  getStatTotalDonations,
  getStatTotalDonationsAmount,
  getStatTotalMembers,
} from "../../api/axios"

export class Report extends Component {
  render() {
    // Render
    return (
      <>
        <Box
          marginLeft={10}
          marginTop={10}
        >
          <Heading>Members Report</Heading>
          <Text
            mb={4}
            color="gray.600"
          >
            As of March 29, 2023
          </Text>

          <Grid
            templateColumns="repeat(3, 1fr)"
            my={5}
          >
            <Stat>
              <StatLabel>Members</StatLabel>
              <StatNumber color="blue.500">527</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Donations</StatLabel>
              <StatNumber color="blue.500">28</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Amount Donated</StatLabel>
              <StatNumber color="blue.500">$6,329</StatNumber>
            </Stat>
          </Grid>

          <Heading
            size="lg"
            mb={4}
          >
            New Members by Month
          </Heading>
          <Flex align="center">
            <MembersGraph
              type="column"
              title=""
              yAxis="No. of Members"
            />
          </Flex>
        </Box>
      </>
    )
  }
}
