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
  useEffect(() => {
    getAllMembers().then((json) => {
      // Filter out members marked for engagement
      setMembers(json)
      setShowColumns(
        json.length > 0 ? Object.keys(json[0]).map((key) => key) : []
      )
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
    const { checked, name } = e.target
    if (checked) {
      setShowColumns([...showColumns, name])
    } else {
      setShowColumns(showColumns.filter((col) => col !== name))
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
              label="Edit Member"
              hasArrow
            >
              <IconButton
                icon={<FiEdit />}
                colorScheme="gray"
                size="sm"
              />
            </Tooltip>
            <Tooltip
              label="Delete Member"
              hasArrow
            >
              <IconButton
                icon={<FiArchive />}
                colorScheme="red"
                size="sm"
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
          <AddMemberPop />
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
