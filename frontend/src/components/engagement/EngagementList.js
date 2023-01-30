
// components
import EngagementListItem from './EngagementListItem';
import React from 'react';
import { Box, Stack, Grid, GridItem, Divider, Text } from '@chakra-ui/react';


const EngagementList = ({ members }) => {

    // Generate a list of EngagementListItem components
    const results = members.map(member =>
        <EngagementListItem key={member._id} member={member} />
    );

    // Handle no results found
    const content = results.length ? results : <article><p id="engagementNoMembers">No members found</p></article>;

    return (
        <>
            <Stack w='100%' boxShadow='lg'>
                <Box pt={3} pl={3}>
                    <Grid templateColumns='repeat(3, 1fr)' gap='5' w="40%" color='gray.500'>
                        <GridItem><Text fontSize='sm'>Name</Text></GridItem>
                        <GridItem><Text fontSize='sm'>Email</Text></GridItem>
                        <GridItem><Text fontSize='sm'>Location</Text></GridItem>
                    </Grid>
                </Box>

                <Divider />

                {content}   
            </Stack>
        </>
    )
}

export default EngagementList
