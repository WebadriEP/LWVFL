import { Heading, Box, Stack } from '@chakra-ui/react';
import React from 'react';
import { useState, useEffect } from 'react';
import { getAllMembers } from '../api/axios';

// components
import EngagementList from '../components/engagement/EngagementList';
import '../components/engagement/engagementStyles.css'

const Engagement = () => {
    const [members, setMembers] = useState([]); // State for members

    // Fetch all members -- Used for search functionality
    useEffect(() => {
        getAllMembers().then(json => {
            // Filter out members marked for engagement
            setMembers(json.filter(member => member.memberStatus === 'engage'))
            //setMembers(json)
        })
    }, [])


    return (
        <Stack>
            <Heading>Engagement List</Heading>
            <Box>
                <EngagementList members={members}/>
            </Box>
        </Stack>
    );
}

export default Engagement;