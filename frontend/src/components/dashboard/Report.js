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
  HStack,
  Divider,
  Center,
} from "@chakra-ui/react"
import MembersGraph from "./MembersGraph"
import DonationsGraph from "./DonationsGraph"
import QuickStats from "./QuickStats"

export class Report extends Component {
  render() {
    return (
      <>
        <Box p={10}>
          <Heading>Dontra CRM - Health Report</Heading>

          {/* Generation date and time */}
          <Text mb={4} color="gray.600">
            Generated{" "}
            {new Date().toLocaleString("default", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            at{" "}
            {new Date().toLocaleString("default", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </Text>

          {/* Quick Stats */}
          <QuickStats />

          {/* New Member Graph */}
          <Box minW="725px">
            <MembersGraph type="column" yAxis="No. of Members" />
            <Box mt={10}>
              <DonationsGraph type="line" yAxis="Amount of Donations ($USD)" />
            </Box>
          </Box>
        </Box>
      </>
    )
  }
}
