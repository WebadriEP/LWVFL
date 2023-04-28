import { useState, useEffect, useCallback } from "react"
import React from "react"

import { useParams, Link } from "react-router-dom"
import { getSingleMember, updateMember } from "../api/axios"
import NavLink from "../components/navigation/NavLink"

// components
import {
  Box,
  Heading,
  Text,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Grid,
  Divider,
  GridItem,
  Tabs,
  TabList,
  Tab,
  SimpleGrid,
  Button,
  HStack,
  Select,
  Spinner,
  ButtonGroup,
} from "@chakra-ui/react"
import BadgeStack from "../components/ui/BadgeStack"
import MemberInfo from "../components/members/MemberInfo"
import Notes from "../components/members/Notes"

const Member = (props) => {
  const { id } = useParams() // Get the ID from the URL
  const [member, setMember] = useState({})
  const [status, setStatus] = useState(member.memberStatus) // Member status
  const [notes, setNotes] = useState("") // Member notes
  const [loading, setLoading] = useState(true) // Loading state
  const [success, setSuccess] = useState(false) // Success toast

  /*
   * Fetch member details
   */
  const getMemberDetails = useCallback(() => {
    getSingleMember(id)
      .then((json) => {
        setMember(json)
        setNotes(json.memberNotes)
        setStatus(json.memberStatus)
      })

      // Error handling
      .catch((err) => {
        setError(err.message)
      })

      .finally(() => {
        setLoading(false)
        setSuccess(true)
      })
  }, [id])

  // Acquire member details
  useEffect(() => {
    /*
     * JADIEL: MOVED THIS TO AN EXTERNAL FUNCTION /\ TO LOWER THE AMOUNT OF GET REQUESTS
     * ALL INFO STILL THERE
     */
    setLoading(true)
    getMemberDetails()
  }, [getMemberDetails])

  // Trigger success toast when memberStatus is changed

  // Format dates
  const createdAt = new Date(member.createdAt).toLocaleDateString()
  const lastUpdated = new Date(member.updatedAt).toLocaleDateString("en-US")

  // Format gender
  let formattedGender
  switch (member.gender) {
    case "male":
      formattedGender = "Male"
      break
    case "female":
      formattedGender = "Female"
      break
    case "other":
      formattedGender = "Other"
      break
  }

  // Retreive notes from child component and update member data
  const notesToParent = (childData) => {
    setNotes(childData)
    updateMember(id, { memberNotes: childData })
  }
  const memberToParent = async (childData) => {
    try {
      // Update member state with new data
      setMember(childData)

      // Call updateMember function with member ID and updated member data
      const updatedMember = { ...member, ...childData } // Merge childData with existing member data
      await updateMember(member.id, updatedMember)
    } catch (error) {
      console.error("Failed to update member:", error)
      // Handle error as needed
    }
  }

  const link = "/donations/list/" + id

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
      <Flex align="center" justify="space-between" mb={5}>
        <Box>
          <Text fontSize="sm">ENTRY DETAILS</Text>
          <Heading
            size="xl"
            textTransform="capitalize"
            mb={2}
            transform="translateX(-2px)"
          >
            {member.firstName} {member.lastName}
          </Heading>

          {/* Badges */}
          <BadgeStack member={member} status={status} />
        </Box>

        {/* Member Status Tabs */}
        <ButtonGroup isAttached>
          {STATUS_OPTIONS.map((option) => {
            return (
              <Button
                key={option.key}
                colorScheme="blue"
                size="md"
                variant={status === option.value ? "solid" : "outline"}
                onClick={(e) => {
                  setMemberStatus(member._id, option.value)
                }}
              >
                {option.label}
              </Button>
            )
          })}
        </ButtonGroup>

        <Flex direction="column">
          <Text fontSize="sm">Last Updated: {lastUpdated}</Text>
        </Flex>
      </Flex>

      {/* Page Body */}

      <Grid
        templateColumns="repeat(2, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap={5}
      >
        {/* Personal Information Card */}
        <GridItem colSpan={1} rowSpan={3}>
          <MemberInfo memberToParent={memberToParent} initialMember={member} />
        </GridItem>

        {/* Notes */}
        <GridItem rowSpan={3}>
          {/* 
            Notes component is a child of Member component.
            Notes component passes notes to parent component (Member component) via notesToParent function.
            Member component passes notes to Notes component via initialNotes prop.
          */}
          <Notes notesToParent={notesToParent} initialNotes={notes} />
        </GridItem>

        {/* Donation list */}
        <GridItem colSpan={3}>
          <Card border="1px solid" borderColor="gray.100" shadow="lg">
            <CardHeader>
              <Heading size="lg">Donations</Heading>
            </CardHeader>

            <CardBody>
              {/* <Button as={NavLink} colorScheme='green' page={link} text='View Donation List' /> */}
              <Button>
                <Link to={link}>View Donation List</Link>
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  )
}

const STATUS_OPTIONS = [
  { key: 1, value: "none", label: "Open" },
  { key: 2, value: "engage", label: "Engage" },
  { key: 3, value: "contacted", label: "Contacted" },
  { key: 4, value: "converted", label: "Converted" },
  { key: 5, value: "notConverted", label: "Not Converted" },
]

export default Member
