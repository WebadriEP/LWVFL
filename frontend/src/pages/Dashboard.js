// components
import React from 'react';
import { Box, Container, Grid } from "@chakra-ui/react";
import QuickActions from "../components/dashboard/QuickActions";
import MembersGraph from "../components/dashboard/MembersGraph";


// css
import '../components/dashboard/dashboardStyles.css'
import { Heading } from '@chakra-ui/react';

const Dashboard = () => {
  return (
    <>
      {/* Quick Actions */}
      <QuickActions />

      {/* Graphs Section */}
      <Grid templateColumns={'1fr 1fr'} gap={5}>

        {/* New Members */}
        <Box 
          shadow='lg' 
          bg='white' 
          p={5}
          borderRadius={10}
          border='1px solid'
          borderColor='gray.100'
        >
          <Heading size='md' mb={5}>New Members by Month</Heading>
          <MembersGraph />
        </Box>
        
        {/* Another Statistic */}
        <Box 
          shadow='lg' 
          bg='white' 
          p={5}
          borderRadius={10}
          border='1px solid'
          borderColor='gray.100'
        >
          <Heading size='md' mb={5}>Another Graph</Heading>
          <MembersGraph />
        </Box>
      </Grid>
    </>
  )
}

export default Dashboard