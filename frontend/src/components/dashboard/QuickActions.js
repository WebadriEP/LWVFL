import React from "react"
import { Box, Grid, Heading, Text, GridItem, VStack } from "@chakra-ui/react"
import { FiUser, FiFileText } from "react-icons/fi"

// components
import QuickActionItem from "./QuickActionItem"
import GenerateReportItem from "./GenerateReportItem"

// css
import "./dashboardStyles.css"

const QuickActions = () => {
  return (
    <Box>
      <Heading size="lg" mb={4} color="gray.700">
        Quick Actions
      </Heading>
      <Grid
        templateColumns="1fr 1fr 1fr"
        gap={5}
        bg="white"
        mt={2}
        mb={10}
        p={2}
        shadow="lg"
        borderRadius={10}
        border="1px solid"
        borderColor="gray.100"
      >
        <QuickActionItem page="members" name="Members List" icon={FiUser} />
        <QuickActionItem
          page="engagement"
          name="Engagement List"
          icon={FiFileText}
        />

        {/* Generate Report */}
        <GenerateReportItem />
      </Grid>
    </Box>
  )
}

export default QuickActions
