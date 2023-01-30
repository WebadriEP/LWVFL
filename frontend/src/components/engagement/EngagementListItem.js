
import '../members/memberStyles.css'
import React from 'react';
import { Link } from "react-router-dom";
import { Flex, Text, Box, Tooltip, Stack, Button, ButtonGroup, Spacer, Grid, GridItem, Link as ReachLink } from '@chakra-ui/react'


const EngagementListItem = ({ member }) => {
    let { _id, firstName, lastName, email, city, state } = member;

    return (
        <Box bg='white' w='100%' p={3} color='gray.700' justify='center' >
            <Flex align='space-between' justify='center'>
                <Grid templateColumns='repeat(3, 1fr)' gap='5' w="40%">

                    {/* Name */}
                    <GridItem display='flex' alignItems='center'>
                        <Link to={`/member/${_id}`} as={ReachLink}>
                            <Text 
                                fontSize='md' 
                                color='blue.600' 
                                _hover={{ 
                                    color: 'blue.400', 
                                    textDecoration: 'underline'
                                }}>
                                {firstName} {lastName}
                            </Text>
                        </Link>
                    </GridItem>

                    {/* Email */}
                    <GridItem display='flex' alignItems='center'>
                        <Text fontSize='sm'>{email}</Text>
                    </GridItem>

                    {/* Location */}
                    <GridItem display='flex' alignItems='center'>
                        <Text fontSize='sm'>{city}, {state}</Text>
                    </GridItem>
                    
                </Grid>

                <Spacer />
                
                {/* Actions */}
                <Stack direction="row" spacing={4}>
                    <ButtonGroup isAttached variant='outline' size='sm'>

                        {/* Copy email */}
                        <Tooltip hasArrow label="Click to copy email address">
                            {/* Add to clipboard using navigator.clipboard */}
                            <Button colorScheme='darkGray' 
                                    onClick={() => {
                                        navigator.clipboard.writeText(this.state.email)
                                    }}>
                                <i className="fa fa-copy"></i>
                            </Button>
                        </Tooltip>

                        {/* Mark as contacted */}
                        <Tooltip hasArrow label="Mark as contacted">
                            <Button colorScheme='blue'>
                                <i className="fa fa-paper-plane"></i>
                            </Button>
                        </Tooltip>

                        {/* Remove from engagement list */}
                        <Tooltip hasArrow label="Remove from list">
                            <Button colorScheme='red'>
                                <i className="fa fa-remove"></i>
                            </Button>
                        </Tooltip>
                    </ButtonGroup>
                </Stack>
            </Flex>
        </Box>
    )
}

export default EngagementListItem;
