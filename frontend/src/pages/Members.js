import {
  Heading,
  Box,
  Stack,
  Link as ReachLink,
  HStack,
  Button,
  ButtonGroup,
  IconButton,
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
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import axios from 'axios'

// components
import MemberActionBar from "../components/members/MemberActionBar";
import MemberDatatable from "../components/members/MemberDatatable";

import MemberTable from '../components/members/memberTable';
import { useTable, useColumns } from 'react-table';




function Members() {
const [members, setMembers] = useState([])
const [search, setSearch] = useState("")
const [searchResults, setSearchResults] = useState([])
const [showColumns, setShowColumns] = useState([]);


const handleDelete = async (id) => {
  try {
    const response = await axios.delete(process.env.REACT_APP_BACKEND_URL+'/api/members/' + id);
    console.log(response.data);
    // Remove the deleted member from the local state
    setMembers(members.filter(member => member._id !== id));
  } catch (error) {
    console.log(error);
  }
}




// Fetch all members -- Used for search functionality
useEffect(() => {
  getAllMembers().then((json) => {
    // Filter out members marked for engagement
    setMembers(json)
    setShowColumns(
      json.length > 0 ? Object.keys(json[0]).map((key) => key) : []
    );
  })
}, [members])

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
    {
      // Renders actions that user can perform, such as deleting or updating
      Header: " ",
      Cell: ({ row }) => (
        <HStack spacing={4} justify="end">
          <Tooltip label="EditIcon Member" hasArrow>
            <IconButton
              icon={<EditIcon />}
              colorScheme="blue"
              size="sm"
            />
          </Tooltip>
          <Tooltip label="Delete Member" hasArrow>
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              size="sm"
              onClick={() => handleDelete(row.original._id)}
            />
          </Tooltip>
        </HStack>
      ),
    },
    
    
  ],
  []
)

return (
  <>
  <AddMemberPop />
    
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