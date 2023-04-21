import { useState, useEffect } from "react";
import React from 'react';

import { useParams, Link } from "react-router-dom";
import { getSingleMember, updateMember } from "../api/axios";
import NavLink from "../components/navigation/NavLink";

// components
import { Box, Heading, Text, Flex, Card, CardHeader, CardBody, Grid, Divider, GridItem, Tabs, TabList, Tab, SimpleGrid, Button } from "@chakra-ui/react";
import BadgeStack from "../components/ui/BadgeStack";
import MemberInfo from "../components/members/MemberInfo";
import Notes from "../components/members/Notes";

const Member = (props) => {
  const { id } = useParams(); // Get the ID from the URL
  const [member, setMember] = useState({});
  const [status, setStatus] = useState('') // Member status
  const [notes, setNotes] = useState('') // Member notes

  // Acquire member details
  useEffect(() => {
    getSingleMember(id)

    // Set member state
    .then(json => {
      setMember(json) // set member state
      setNotes(json.memberNotes) // set notes state
      setStatus(json.memberStatus) // set status state
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

  let statusTabIndex;
  switch (member.memberStatus) {
    case 'none':
      statusTabIndex = 0;
      break;
    case 'engage':
      statusTabIndex = 1;
      break;
    case 'contacted':
      statusTabIndex = 2;
      break;
    case 'other':
      statusTabIndex = 3;
      break;
    case 'nonconverted':
      statusTabIndex = 4;
      break;
    default: 
      statusTabIndex = 0;
  }

  // Retreive notes from child component and update member data
  const notesToParent = (childData) => {
    setNotes(childData)
    updateMember(id, { memberNotes: childData })
  }
  const memberToParent = async (childData) => {
    try {
      // Update member state with new data
      setMember(childData);
  
      // Call updateMember function with member ID and updated member data
      const updatedMember = { ...member, ...childData }; // Merge childData with existing member data
      await updateMember(member.id, updatedMember);
      console.log('Member updated successfully:', updatedMember);
    } catch (error) {
      console.error('Failed to update member:', error);
      // Handle error as needed
    }
  };

  const link = "/donations/list/" + id;

  // Render donations
  // const donations = member.donations.map(donation => {
  //   <MemberDonation key={donation._id} donation={donation} />
  // })

  // Handle no donations found
  //const content = donations.length ? donations : <article><p>No donations found.</p></article>;

  const setMemberStatus = (memberID, status) => {
    updateMember(memberID, { memberStatus: status })
    setStatus(status) // Status badge state
  }

  return (
    <Box>
      {/* Heading & Last Updated */}
      <Flex align='center' justify='space-between' mb={5}>
        <Box>
          <Text fontSize='sm'>ENTRY DETAILS</Text>
          <Heading size='xl' textTransform='capitalize' mb={2} transform='translateX(-2px)'>
            {member.firstName} {member.lastName}
          </Heading>

          {/* Badges */}
          <BadgeStack member={member} status={status}  />
        </Box>

        {/* Member Status Tabs */}
        <Box>
          <Tabs variant='solid-rounded' colorScheme='blue' defaultIndex={statusTabIndex}>
            <TabList>
              <Tab m={2} onClick={() => setMemberStatus(member._id, 'none')}>Open</Tab>
              <Tab m={2} onClick={() => setMemberStatus(member._id, 'engage')}>Engage</Tab>
              <Tab m={2} onClick={() => setMemberStatus(member._id, 'contacted')}>Contacted</Tab>
              <Tab m={2} onClick={() => setMemberStatus(member._id, 'other')}>Converted</Tab>
              <Tab m={2} onClick={() => setMemberStatus(member._id, 'other')}>Not Converted</Tab>
            </TabList>
          </Tabs>
        </Box>

        <Flex direction='column'>
          <Text fontSize='sm'>Last Updated: {lastUpdated}</Text>
        </Flex>
      </Flex>

      {/* Page Body */}

      <Grid templateColumns='1fr 1fr' gap={5}>
        {/* Personal Information Card */}
        <GridItem>
          <MemberInfo memberToParent={memberToParent} initialMember={member} />
        </GridItem>
        
        {/* Notes */}
        <GridItem>
          {/* 
            Notes component is a child of Member component.
            Notes component passes notes to parent component (Member component) via notesToParent function.
            Member component passes notes to Notes component via initialNotes prop.
          */}
          <Notes notesToParent={notesToParent} initialNotes={notes} />
        </GridItem>
        
        {/* Donation list */}
        <GridItem colSpan={2}>
          <Card border='1px solid' borderColor='gray.100' shadow='lg'>
            <CardHeader>
              <Heading size='lg'>Donations</Heading>
            </CardHeader>
            
            <CardBody>
            {/* <Button as={NavLink} colorScheme='green' page={link} text='View Donation List' /> */}
            <Button><Link to = {link}>View Donation List</Link></Button>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default Member