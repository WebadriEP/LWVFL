import {
  Heading,
  Link as ReachLink,
  HStack,
  Button,
  IconButton,
  Tooltip,
  Flex,
} from "@chakra-ui/react"
import AddMemberPop from "../components/members/AddMemberPop"
import { useState, useEffect, useMemo } from "react"
import { getAllMembers, updateMember } from "../api/axios"
import { Link, useNavigate } from "react-router-dom"
import { FiArchive, FiEdit } from "react-icons/fi"
import { TbFileImport } from "react-icons/tb"
import axios from "axios"

import MemberTable from "../components/members/memberTable"

const Members = () => {
  const [members, setMembers] = useState([])
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showColumns, setShowColumns] = useState([])
  

  const navigate = useNavigate()
  const routeChange = () => {
    let path = `/members/import`
    navigate(path)
  }

  // Fetch all members -- Used for search functionality
  const fetchMembers = () => {
    getAllMembers().then((json) => {
      setMembers(json)
      setShowColumns(
        json.length > 0 ? Object.keys(json[0]).map((key) => key) : []
      )
      console.log("running")
    })
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleAddMember = (newMember) => {
    // Update the state with the new member data
    try {
      setMembers([...members, newMember]);
    } catch (error) {
      console.log("Error adding member:", error);
    }
    
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(process.env.REACT_APP_BACKEND_URL+'/api/members/' + id);
      console.log(response.data);
      // Remove the deleted member from the local state
      setMembers(members => members.filter(member => member._id !== id));
    } catch (error) {
      console.log(error);
    }
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
        // Renders actions that user can perform, such as deleting or updating
        Header: " ",
        Cell: ({ row }) => (
          <HStack
            spacing={4}
            justify="end"
          >
            <Tooltip
              label="Delete Member"
              hasArrow
            >
              <IconButton
                icon={<FiArchive />}
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
      <Flex
        direction="row"
        justify="space-between"
        align="center"
      >
        <Heading
          as="h1"
          size="xl"
          mb={4}
        >
          Members
        </Heading>
        <Flex
          maxW="30%"
          align="space-between"
          gap={4}
        >
          <Button
            colorScheme="gray"
            rightIcon={<TbFileImport />}
            onClick={routeChange}
            _hover={{
              textDecoration: "none",
            }}
          >
            Import
          </Button>
          <AddMemberPop onAddMember={handleAddMember}/>
        </Flex>
      </Flex>

      <MemberTable
        columns={columns}
        data={members}
      />
    </>
  )
}

export default Members
