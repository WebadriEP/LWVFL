
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
            <EngagementListItem />
        </>
    )
}

export default EngagementList
