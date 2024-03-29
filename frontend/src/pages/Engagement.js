import {
  Heading,
  Box,
  Stack,
  Link as ReachLink,
  HStack,
  Button,
  Tooltip,
  Input,
  Flex,
  Checkbox,
  Radio,
  Text,
} from "@chakra-ui/react"
import React from "react"
import { useState, useEffect, useMemo } from "react"
import { getAllMembers, updateMember } from "../api/axios"
import { Link } from "react-router-dom"

// components
import EngagementTable from "../components/engagement/EngagementTable"

const Engagement = () => {
  const [members, setMembers] = useState([])



  useEffect(() => {
    console.log("Fetching members...")
    getAllMembers().then((json) => {
      // Filter out members marked for engagement
      setMembers(
        json ? json.filter((member) => member.memberStatus === "engage") : []
      )
    })
  }, [])


  const handleActiveFilter = (e) => {
    setActiveFilter(e.target.checked)
  }

  const handleMarkContacted = (id) => {
    updateMember(id, { memberStatus: "contacted" })
    // update members state to remove member from list
    setMembers(members => members.filter((member) => member._id !== id))
  }

  //   Determines the columns for the table and what is rendered inside each cell
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "fullName",
        Cell: (props) => (
          // Takes name as prop and renders it as a styled link to the member's profile
          <ReachLink
            as={Link}
            to={`/member/${props.row.original._id}`}
            color="blue.500"
          >
            {props.value}
          </ReachLink>
          //   TODO: Render badges depicting status, isStudent, etc. (use shorthand like a single letter or an icon)
        ),
        className: "nameCell",
      },
      {
        // Renders member's email
        Header: "Email",
        accessor: "email",
      },
      {
        // Renders member's phone number
        Header: "Phone Number",
        accessor: "phone",
      },
      {
        // Location (City, State)
        Header: "Location",
        accessor: "location",
      },
      {
        // Renders actions that user can perform, such as marking member as contacted
        Header: " ",
        Cell: ({ row }) => (
          <HStack spacing={4} justify="end">
            <Tooltip label="Mark as contacted" hasArrow>
              <Button
                colorScheme="green"
                size="sm"
                onClick={() => handleMarkContacted(row.original._id)}
              >
                {/* trash icon */}
                <i className="fa fa-check"></i>
              </Button>
            </Tooltip>
          </HStack>
        ),
      },
    ],
    []
  )

  return (
    <>
      <HStack justify="space-between" mb={5}>
        <Heading>Engagement List</Heading>
      </HStack>

      <Flex direction="row">


        {/* Table */}
        <Box
          bg="white"
          borderRadius={8}
          border="1px"
          borderColor="gray.50"
          w="100%"
        >
          {/* Table generated with React-Table */}
          <EngagementTable columns={columns} data={members} />
        </Box>
      </Flex>
    </>
  )
}

export default Engagement
