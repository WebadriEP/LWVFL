import { Link } from "react-router-dom";
import React from 'react';

// css
import './dashboardStyles.css'
import { GridItem, Heading, Text, VStack } from "@chakra-ui/react";

const QuickActionItem = (props) => {
  return (
    <GridItem 
      as={Link} 
      to={props.page} 
      py={6}
      px={8} 
      transition='all 200ms ease-in-out'
      borderRadius={10}
      _hover={{
        backgroundColor: 'gray.50',
      }}
    >
      <VStack alignItems='start' justifyContent='space-around'>
        <Heading size='md' marginBottom={0} color='gray.700'>{props.name}</Heading>
        <Text marginTop={0} color='gray.600'>{props.description}</Text>
      </VStack>
    </GridItem>
  )
}

export default QuickActionItem