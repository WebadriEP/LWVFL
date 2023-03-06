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
  import AddMemberPop from "../components/members/AddMemberPop"
  import React from "react"
  import { useState, useEffect, useMemo } from "react"
  import { getAllMembers, updateMember } from "../api/axios"
  import { Link } from "react-router-dom"

// components
import MemberActionBar from "../components/members/MemberActionBar";
import MemberDatatable from "../components/members/MemberDatatable";

import MemberTable from '../components/members/memberTable';
import { useTable, useColumns } from 'react-table';




const Members = () => {
  const [members, setMembers] = useState([])
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showColumns, setShowColumns] = useState([]);

  // Fetch all members -- Used for search functionality
  useEffect(() => {
    getAllMembers().then((json) => {
      // Filter out members marked for engagement
      setMembers(json)
      setShowColumns(
        json.length > 0 ? Object.keys(json[0]).map((key) => key) : []
      );
    })
  }, [])

  // Search functionality
  const handleSearch = (e) => {
    setSearch(e.target.value)

    if (e.target.value === "") {
      setSearchResults(members)
      return
    }

    setSearchResults(
      members.filter((member) =>
        member.fullName.toLowerCase().includes(search.toLowerCase())
      )
    )
  }
  const handleColumnToggle = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      setShowColumns([...showColumns, name]);
    } else {
      setShowColumns(showColumns.filter((col) => col !== name));
    }
  };

  

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
      
      
    ],
    []
  )

  return (
    <>
    <AddMemberPop />
      <HStack justify="space-between" mb={5}>
        <Heading>Members List</Heading>

        <Box>
          <Input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
          />
        </Box>
        
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
          <MemberTable columns={columns} data={members} />
        </Box>
      </Flex>
    </>
  )
  }


export default Members;