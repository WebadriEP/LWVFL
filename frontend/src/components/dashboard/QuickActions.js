import React from 'react'
import { Box, Grid, Heading } from "@chakra-ui/react"

// components
import QuickActionItem from "./QuickActionItem";

// css
import './dashboardStyles.css'

const QuickActions = () => {
  return (
  <Box>
    <Heading size='lg' mb={0} color='gray.700'>Quick Actions</Heading>
    <Grid 
      templateColumns='1fr 1fr' 
      gap={5} 
      bg='white' 
      mt={2}
      mb={10} 
      p={2} 
      shadow='lg'
      borderRadius={10}
      border='1px solid'
      borderColor='gray.100'
    >
      <QuickActionItem page="members" name="All Members" description="View and search a list of all members" />
      <QuickActionItem page="donors" name="All Donors" description="View and search a list of all donors" />
      <QuickActionItem page="engagement" name="Engagement" description="View a list of those marked for engagement" />
      <QuickActionItem page="reports/new" name="Generate Report" description="Instantly generate a new report from existing data" />
    </Grid>
  </Box>
  )
}

export default QuickActions