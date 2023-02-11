import { Heading, Box, Stack } from '@chakra-ui/react';
import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { getAllMembers } from '../api/axios';
import { Link } from 'react-router-dom';

// css
import '../components/engagement/EngagementStyles.css'

// components
import EngagementTable from '../components/engagement/EngagementTable';

const Engagement = () => {
    const [members, setMembers] = useState([]);
    
    // Fetch all members -- Used for search functionality
    useEffect(() => {
        getAllMembers().then(json => {
            // Filter out members marked for engagement
            setMembers(json.filter(member => member.memberStatus === 'engage'))
            //setMembers(json)
        })
    }, [])

    const columns = useMemo(() => [
        {
          Header: 'Name',
          accessor: 'fullName',
          Cell: props => <Link to={`/member/${props.row.original._id}`}>{props.value}</Link>,
          className: 'nameCell'
        },
        {
          Header: 'Email',
          accessor: 'email',
        },
        {
          Header: 'Phone Number',
          accessor: 'phone',
        },
    ], [])

    return (
        <Stack>
            <Heading mb={5}>Engagement List</Heading>
            <Box>
                <EngagementTable columns={columns} data={members} />
            </Box>
        </Stack>
    );
}

export default Engagement;