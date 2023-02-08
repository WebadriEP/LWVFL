import { Heading, Box, Stack } from '@chakra-ui/react';
import React from 'react';
import { useState, useEffect } from 'react';
import { getAllMembers } from '../api/axios';

// components
import EngagementList from '../components/engagement/EngagementList';
import EngagementDatatable from '../components/engagement/EngagementDatatable';

const Engagement = () => {
    const [members, setMembers] = useState([]); // State for members

    // Fetch all members -- Used for search functionality
    // useEffect(() => {
    //     getAllMembers().then(json => {
    //         // Filter out members marked for engagement
    //         setMembers(json.filter(member => member.memberStatus === 'engage'))
    //         //setMembers(json)
    //     })
    // }, [])

    return (
        <Stack>
            <Heading mb={5}>Engagement List</Heading>
            <Box>
                <EngagementDatatable />
            </Box>
            
        </Stack>
    );
}

export default Engagement;