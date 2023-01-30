import { useState, useEffect } from "react";
import React from 'react';

import { useParams } from "react-router-dom";
import { getSingleMember, updateMember } from "../api/axios";

// css
import '../components/members/memberStyles.css'

// components
import { Box, Heading, Text, Flex, Card, CardHeader, CardBody, Grid, Divider, Tag, TagLabel, GridItem, Button, Spacer } from "@chakra-ui/react";
import BadgeStack from "../components/ui/BadgeStack";

const Member = (props) => {
  const { id } = useParams(); // Get the ID from the URL
  const [member, setMember] = useState({});
  const [status, setStatus] = useState('') // Member status

  // Acquire member details
  useEffect(() => {
    getSingleMember(id) // Axios call to get member by ID

    // Set member state
    .then(json => {
      setMember(json)
    })

    // Error handling
    .catch(err => {
      console.log(err)
    })
  }, [])

  // Format dates
  const createdAt = new Date(member.createdAt).toLocaleDateString();
  const lastUpdated = new Date(member.updatedAt).toLocaleDateString();

  // Format gender
  let formattedGender;
  switch (member.gender) {
    case 'male': 
      formattedGender = 'Male';
      break;
    case 'female':
      formattedGender = 'Female';
      break;
    case 'other':
      formattedGender = 'Other';
      break;
  }

  // Render donations
  // const donations = member.donations.map(donation => {
  //   <MemberDonation key={donation._id} donation={donation} />
  // })

  // Handle no donations found
  //const content = donations.length ? donations : <article><p>No donations found.</p></article>;

  const markForEngagement = (memberID) => {
    // memberStatus to 'engage'
    updateMember(memberID, { memberStatus: 'engage' })
    setStatus('engage') // Status badge state
  }

  const resetMemberStatus = (memberID) => {
    // memberStatus to 'none'
    updateMember(memberID, { memberStatus: 'none' })
    setStatus('none') // Status badge state
  }

  return (
    <Box>
      {/* Heading & Last Updated */}
      <Flex align='center' justify='space-between'>
        <Box>
          <Text fontSize='sm'>ENTRY DETAILS</Text>
          <Heading mb={3}>
            {member.firstName} {member.lastName}
          </Heading>

          {/* Badges */}
          <BadgeStack member={member} status={status} />
        </Box>
        <Flex direction='column'>
          <Text fontSize='sm'>Last Updated: {lastUpdated}</Text>
          
          {/* Mark for Engagement Button */}
          {status === 'none' 
          ? <Button colorScheme='blue' size='sm' variant='outline' mt={3} onClick={() => markForEngagement(member._id)}>Mark for Engagement</Button> 
          : null}

          {/* Reset Status Button */}
          {status != 'none' 
          ? <Button colorScheme='red' size='sm' variant='solid' mt={3} onClick={() => resetMemberStatus(member._id)}>Reset Status</Button> 
          : null}
        </Flex>
      </Flex>

      {/* Page Body */}

      <Grid templateColumns='1fr 1fr' gap={3}>
        {/* Personal Information Card */}
        <GridItem>
          <Card>
            <CardHeader>
              <Heading size='md'>Personal Information</Heading>
            </CardHeader>
            
            <CardBody>
              <Divider color='gray.200' />
              <Text m='.5rem 0'>Email: {member.email}</Text>
              <Divider color='gray.200' />
              <Text m='.5rem 0'>Phone: {member.phone}</Text>
              <Divider color='gray.200' />
              <Text m='.5rem 0'>{`Date of Birth: ${member.birthMonth}/${member.birthDay}/${member.birthYear}`}</Text>
              <Divider color='gray.200' />
              <Text m='.5rem 0'>Gender: {formattedGender}</Text>
              <Divider color='gray.200' />
              <Text m='.5rem 0'>Address: {member.homeAddress}, { member.addressLine2 ? (member.addressLine2 + ', ') : null } {member.city}, {member.state} {member.zip}</Text>
              <Divider color='gray.200' />
              <Text m='.5rem 0'>Member Since: {createdAt}</Text>
              <Divider color='gray.200' />
            </CardBody>
          </Card>
        </GridItem>
        
        {/* Notes */}
        <GridItem>
          <Card>
            <CardHeader>
              <Heading size='md'>Notes</Heading>
            </CardHeader>
            
            <CardBody>
              <Divider color='gray.200' />
              <Text m='.5rem 0'>{member.memberNotes}</Text>
              <Divider color='gray.200' />
            </CardBody>
          </Card>
        </GridItem>
        
        {/* Donation list */}
        <GridItem colSpan={2}>
          <Card>
            <CardHeader>
              <Heading size='md'>Donations</Heading>
            </CardHeader>
            
            <CardBody>
              <Divider color='gray.200' />
              <Text m='.5rem 0'>No donations found.</Text>
              <Divider color='gray.200' />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default Member